import React, { useState } from "react";
import { verifyIdToken } from "../../../auth/firebaseAdmin";
import firebaseClient from "../../../auth/firebaseClient";
import nookies from "nookies";

import styles from "./index.module.scss";

import useGetProjects from "../../../hooks/useGetProjects";

import Projects from "../../../components/Projects/Projects";
import Navbar from "../../../components/Navbar/Navbar";
import ProjectOverviewMain from "../../../components/ProjectOverviewMain/ProjectOverviewMain";
import AddProjectFAB from "../../../components/AddProjectFAB/AddProjectFAB";
import AddProjectModal from "../../../components/AddProjectModal/AddProjectModal";
import Loader from "../../../components/Loader/Loader";
import EmptyScreen from "../../../components/EmptyScreen/EmptyScreen";

export default function User({ session }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  let view, addProjectModal, emptyScreen;

  firebaseClient();

  (async () => {
    const [projects, loading] = await useGetProjects(session.uid);
    setProjects(projects);
    setLoading(loading);
  })();

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
    emptyScreen = <EmptyScreen />;
  }

  if (projects.length) {
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
