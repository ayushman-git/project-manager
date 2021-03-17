import React, { useState, useEffect } from "react";
import Image from "next/image";
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
import Loader from "../../../components/Loader/Loader";

export default function User({ session }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  let view, addProjectModal, emptyScreen;
  const db = firebase.firestore();
  firebaseClient();
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      let query = db.collection("projects");
      query = query.where("userId", "==", session.uid);
      query = query.where("archive", "==", false);
      query.onSnapshot((snapshotOfProjects) => {
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

  if (!projects.length && !loading) {
    emptyScreen = (
      <div className={styles.emptyDiv}>
        <Image
          src={`/images/illustrations/i_${Math.floor(Math.random() * 7)}.svg`}
          height={300}
          width={300}
        />
        <h2>Add Projects</h2>
      </div>
    );
  }

  if (session && projects.length) {
    const activeProject = projects.find((pr) => pr.active);
    const inActiveProjects = projects.filter((pr) => !pr.active);
    view = (
      <div>
        <div style={{ marginTop: "2rem" }}>
          <ProjectOverviewMain project={activeProject} />
        </div>
        {inActiveProjects && <Projects projects={inActiveProjects} />}
      </div>
    );
  } else if (loading) {
    view = <Loader />;
  }

  return (
    <div className={styles.homeWrap}>
      <main className="maxWidth">
        <Navbar image={session.picture} />
        {emptyScreen}
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
    const token = await verifyIdToken(cookies.tknCookies);
    return {
      props: {
        session: token,
      },
    };
  } catch (err) {
    console.log(err, "user page");
    context.res.writeHead(302, { Location: "/" });
    context.res.end();
    return {
      props: {},
    };
  }
}
