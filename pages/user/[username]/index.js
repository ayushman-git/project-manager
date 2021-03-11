import React, { useState, useEffect } from "react";
import { verifyIdToken } from "../../../auth/firebaseAdmin";
import firebaseClient from "../../../auth/firebaseClient";
import firebase from "firebase";
import nookies from "nookies";

import useDaysLeft from "../../../hooks/useDaysLeft";
import Projects from "../../../components/Projects/Projects";
import Navbar from "../../../components/Navbar/Navbar";
import ProjectOverviewMain from "../../../components/ProjectOverviewMain/ProjectOverviewMain";
import AddProjectFAB from "../../../components/AddProjectFAB/AddProjectFAB";
import AddProjectModal from "../../../components/AddProjectModal/AddProjectModal";

export default function User({ session }) {
  const [projects, setProjects] = useState([]);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  let view, addProjectModal;
  const db = firebase.firestore();
  if (showAddProjectModal) {
    addProjectModal = (
      <AddProjectModal
        closeModal={() => setShowAddProjectModal(false)}
        session={session}
        empty={projects.length ? false : true}
      />
    );
  }
  useEffect(() => {
    (async () => {
      db.collection("projects")
        .where("userId", "==", session.uid)
        .onSnapshot((snapshotOfProjects) => {
          const projects = [];
          snapshotOfProjects.forEach((doc) => {
            projects.push({
              ...doc.data(),
              projectId: doc.id,
              dueDate: useDaysLeft(doc.data().dueDate),
            });
          });
          setProjects(projects);
        });
    })();
  }, []);

  firebaseClient();
  if (session && projects.length) {
    const activeProject = projects.find((pr) => pr.active);
    view = (
      <div className="maxWidth">
        <Navbar image={session.picture} />
        <ProjectOverviewMain project={activeProject} />
        <Projects projects={projects.filter((pr) => !pr.active)} />
        <AddProjectFAB FABClicked={() => setShowAddProjectModal(true)} />
        {addProjectModal}
      </div>
    );
  } else if (session) {
    view = (
      <>
        <div className="maxWidth">
          <Navbar image={session.picture} />
          <h1>Add Projects</h1>
          <AddProjectFAB FABClicked={() => setShowAddProjectModal(true)} />
          {addProjectModal}
        </div>
      </>
    );
  } else {
    view = <h1>Loading...</h1>;
  }
  return <main>{view}</main>;
}

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    return {
      props: {
        session: token,
      },
    };
  } catch (err) {
    console.log("err");
    context.res.writeHead(302, { location: "/" });
    context.res.end();
    return {
      props: { session: null },
    };
  }
}
