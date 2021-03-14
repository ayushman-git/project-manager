import React, { useState, useEffect } from "react";
import { verifyIdToken } from "../../../auth/firebaseAdmin";
import firebaseClient from "../../../auth/firebaseClient";
import firebase from "firebase";
import nookies from "nookies";

import styles from "./index.module.scss";

import useDaysLeft from "../../../hooks/useDaysLeft";
import Projects from "../../../components/Projects/Projects";
import Navbar from "../../../components/Navbar/Navbar";
import ProjectOverviewMain from "../../../components/ProjectOverviewMain/ProjectOverviewMain";
import AddProjectFAB from "../../../components/AddProjectFAB/AddProjectFAB";
import AddProjectModal from "../../../components/AddProjectModal/AddProjectModal";

export default function User({ session }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  let view, addProjectModal;
  const db = firebase.firestore();
  firebaseClient();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
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
          if (!cancelled) {
            setProjects(projects);
            setLoading(false);
          }
        });
    })();
    return () => (cancelled = true);
  }, []);

  if (showAddProjectModal) {
    addProjectModal = (
      <AddProjectModal
        closeModal={() => setShowAddProjectModal(false)}
        session={session}
        empty={projects.length ? false : true}
      />
    );
  }

  if (session && projects.length) {
    const activeProject = projects.find((pr) => pr.active);
    const inActiveProjects = projects.filter((pr) => !pr.active);
    view = (
      <div>
        <ProjectOverviewMain project={activeProject} />
        {inActiveProjects && <Projects projects={inActiveProjects} />}
      </div>
    );
  } else if (loading) {
    view = <h1>Loading...</h1>;
  }

  return (
    <div className={styles.homeWrap}>
      <main className="maxWidth">
        <Navbar image={session.picture} />
        {!projects.length && !loading && <h1>Add projects</h1>}
        {view}
        <AddProjectFAB FABClicked={() => setShowAddProjectModal(true)} />
        {addProjectModal}
      </main>
    </div>
  );
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
