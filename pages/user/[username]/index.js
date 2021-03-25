import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { verifyIdToken } from "../../../auth/firebaseAdmin";
import firebaseClient from "../../../auth/firebaseClient";
import nookies from "nookies";

import styles from "./index.module.scss";

import useGetProjects from "../../../hooks/useGetProjects";

import Projects from "../../../components/Projects/Projects";
import Navbar from "../../../components/Navbar/Navbar";
import ProjectOverviewMain from "../../../components/ProjectOverviewMain/ProjectOverviewMain";
import FloatingActionButton from "../../../components/FloatingActionButton/FloatingActionButton";
import AddProjectModal from "../../../components/AddProjectModal/AddProjectModal";
import Loader from "../../../components/Loader/Loader";
import EmptyScreen from "../../../components/EmptyScreen/EmptyScreen";

export default function User({ session }) {
  firebaseClient();
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  let view, emptyScreen;
  let addProjectModal = showAddProjectModal && (
    <AddProjectModal
      closeModal={() => setShowAddProjectModal(false)}
      session={session}
      empty={projects.length ? false : true}
    />
  );

  (async () => {
    const [projects, loading] = await useGetProjects(session.uid);
    setProjects(projects);
    setLoading(loading);
  })();

  if (!projects.length && !loading) {
    emptyScreen = <EmptyScreen />;
  }

  if (projects.length) {
    const activeProject = projects.find((pr) => pr.active);
    const inActiveProjects = projects.filter((pr) => !pr.active);
    view = (
      <div style={{ paddingTop: "2rem" }}>
        {activeProject && <ProjectOverviewMain project={activeProject} />}
        {inActiveProjects && <Projects projects={inActiveProjects} />}
      </div>
    );
  } else if (loading) {
    view = <Loader />;
  }

  return (
    <div className={styles.homeWrap}>
      <Head>
        <title>PROTO | {router.query.username}</title>
      </Head>
      <main className="maxWidth">
        <Navbar image={session.picture} />
        {emptyScreen}
        {view}
        <FloatingActionButton
          FABClicked={() => setShowAddProjectModal(true)}
          image="plus"
        />
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
    return {
      props: {},
    };
  }
}
