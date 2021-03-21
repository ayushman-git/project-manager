import React, { useEffect, useState, useRef } from "react";
import nookies from "nookies";
import { verifyIdToken } from "../../../../auth/firebaseAdmin";
import { useRouter } from "next/router";
import { useSpring, animated } from "react-spring";
import firebaseClient from "../../../../auth/firebaseClient";
import firebase from "firebase";
import Image from "next/image";

import styles from "./index.module.scss";

import useChangeStatus from "../../../../hooks/useChangeStatus";
import useDaysLeft from "../../../../hooks/useDaysLeft";
import useUpdateFirestore from "../../../../hooks/useUpdateFirestore";
import useMakeElEditable from "../../../../hooks/useMakeElEditable";
import useUpdateShortcuts from "../../../../hooks/useUpdateShortcuts";
import useDelProject from "../../../../hooks/useDelProject";
import useDelShortcut from "../../../../hooks/useDelShortcut";
import AddHoverAnimation from "../../../../HOCs/AddHoverAnimation";
import useGetProject from "../../../../hooks/useGetProject";

import SetTheme from "../../../../components/SetTheme/SetTheme";
import Navbar from "../../../../components/Navbar/Navbar";
import DueDate from "../../../../components/DueDate/DueDate";
import Shortcuts from "../../../../components/Shortcuts/Shortcuts";
import AddShortcutModal from "../../../../components/AddShortcutModal/AddShortcutModal";
import ScrumBoard from "../../../../components/ScrumBoard/ScrumBoard";
import DelModal from "../../../../components/ScrumBoard/DelModal/DelModal";
import TasksCompleted from "../../../../components/Event/TasksCompleted";
import StoriesCompleted from "../../../../components/Event/StoriesCompleted";
import Loader from "../../../../components/Loader/Loader";
import Status from "../../../../components/Status/Status";
import ProjectModify from "../../../../components/ProjectModify/ProjectModify";

export default function project({ session }) {
  const [projectDetail, setProjectDetail] = useState({});
  const [toggleAddShortcut, setToggleAddShortcut] = useState(false);
  const [toggleProjectDel, setToggleProjectDel] = useState(false);
  const [toggleProjectArchive, setToggleProjectArchive] = useState(false);
  firebaseClient();
  const router = useRouter();
  const db = firebase.firestore();

  const descriptionRef = useRef();
  const titleRef = useRef();
  const tagRef = useRef();

  let projectId = router.query?.projectId || localStorage.getItem("projectId");
  let projectView = <Loader />;
  let addShortcutModal;

  useEffect(() => {
    if (router.query?.projectId) {
      localStorage.setItem("projectId", projectId);
    }
  }, [projectId]);

  useGetProject(projectId, setProjectDetail);

  let projectButtons = (
    <ProjectModify
      delToggle={() => setToggleProjectDel(true)}
      archiveToggle={() => setToggleProjectArchive(true)}
    />
  );

  const delProject = () => {
    useDelProject(projectDetail.active, projectId, session.uid);
    router.back();
    setToggleProjectDel(false);
  };

  const archiveProject = async () => {
    if (projectDetail.active) {
      if (projectDetail.active) {
        let selectedProject = db.collection("projects");
        selectedProject = selectedProject.where(
          firebase.firestore.FieldPath.documentId(),
          "==",
          projectDetail.projectId
        );

        let newProject = db.collection("projects");
        newProject = newProject.where("userId", "==", session.uid);
        newProject = newProject.where("active", "==", false);
        newProject = newProject.where("archive", "==", false);
        const docs = await Promise.all([
          selectedProject.get(),
          newProject.get(),
        ]);
        const selectedProjectRef = docs[0];
        const newProjectRef = docs[1];
        selectedProjectRef.docs[0].ref.update({ active: false, archive: true });
        if (newProjectRef.docs.length) {
          newProjectRef.docs[0].ref.update({ active: true });
        }
      }
    } else {
      db.collection("projects")
        .where(
          firebase.firestore.FieldPath.documentId(),
          "==",
          projectDetail.projectId
        )
        .get()
        .then((query) => {
          const pr = query.docs[0];
          pr.ref.update({ archive: true });
        });
    }
    router.back();
  };

  if (toggleAddShortcut) {
    addShortcutModal = (
      <AddShortcutModal
        closeModal={() => setToggleAddShortcut(false)}
        updateShortcuts={(shortcutUrl, platform) =>
          useUpdateShortcuts(
            projectDetail.shortcuts,
            shortcutUrl,
            platform,
            projectId,
            setToggleAddShortcut
          )
        }
      />
    );
  }
  if (Object.keys(projectDetail).length > 0) {
    const header = (
      <header className={styles.header}>
        <div className={styles.titleWithAddOns}>
          <h1
            ref={titleRef}
            onDoubleClick={() => useMakeElEditable(titleRef)}
            onBlur={(e) =>
              useUpdateFirestore(e, titleRef, "projectName", projectId)
            }
          >
            {projectDetail.projectName}
          </h1>
          <span className={styles.tag}>
            #
            <span
              ref={tagRef}
              onBlur={(e) => useUpdateFirestore(e, tagRef, "tag", projectId)}
              onDoubleClick={() => useMakeElEditable(tagRef)}
            >
              {projectDetail.tag}
            </span>
          </span>
          <DueDate
            days={projectDetail.dueDate}
            projectId={projectId}
            className={styles.dueDate}
          />
        </div>
        <div className={styles.headerRight}>
          <Status
            active={projectDetail.active}
            changeActiveStatus={() =>
              useChangeStatus(projectDetail.active, session.uid, projectId)
            }
          />
          <SetTheme
            currentTheme={projectDetail.theme}
            projectId={
              router.query.projectId || localStorage.getItem("projectId")
            }
          />
        </div>
      </header>
    );
    const info = (
      <section className={styles.info}>
        <section className={styles.shortcutsWrap}>
          {projectDetail.shortcuts && (
            <Shortcuts
              shortcuts={projectDetail.shortcuts}
              delShortcut={(shortcutId) =>
                useDelShortcut(projectDetail.shortcuts, shortcutId, projectId)
              }
            />
          )}

          <Image
            src="/images/plus-white.svg"
            width={15}
            height={15}
            className={styles.addShortcut}
            onClick={() => setToggleAddShortcut(true)}
          />
        </section>
        <div className={styles.mainWrap}>
          <div
            className={styles.description}
            ref={descriptionRef}
            onBlur={(e) =>
              useUpdateFirestore(e, descriptionRef, "description", projectId)
            }
            onDoubleClick={() => useMakeElEditable(descriptionRef)}
          >
            {projectDetail.description}
          </div>

          <aside className={styles.stats}>
            <AddHoverAnimation>
              <div className={`${styles.statCard} card`}>
                <TasksCompleted stories={projectDetail.stories} />
              </div>
            </AddHoverAnimation>
            <AddHoverAnimation>
              <div className={`${styles.statCard} card`}>
                <StoriesCompleted stories={projectDetail.stories} />
              </div>
            </AddHoverAnimation>
          </aside>
        </div>
      </section>
    );
    projectView = (
      <section className={styles.projectWrap}>
        <div className={styles.projectInfo}>
          {header}
          {info}
          {addShortcutModal}
        </div>
        <h2 style={{ textAlign: "center", marginTop: "4rem" }}>Scrum Board</h2>
        <ScrumBoard stories={projectDetail.stories} projectId={projectId} />
        {projectButtons}
      </section>
    );
  }
  const bgTransition = useSpring({
    background: projectDetail.theme
      ? `linear-gradient(-45deg, ${projectDetail.theme[0]}, ${projectDetail.theme[1]})`
      : `linear-gradient(-45deg, #000000, #130F40)`,
  });

  return (
    <animated.div className={styles.wrap} style={bgTransition}>
      <div className="maxWidth" style={{ minHeight: "100vh" }}>
        <Navbar image={session.picture} />
        {projectView}

        {toggleProjectDel && (
          <DelModal
            closeModal={() => setToggleProjectDel(false)}
            confirmDel={delProject}
            message="Delete Project?"
          />
        )}
        {toggleProjectArchive && (
          <DelModal
            closeModal={() => setToggleProjectArchive(false)}
            confirmDel={() => {
              archiveProject();
              setToggleProjectArchive(false);
            }}
            message="Project Completed?"
          />
        )}
      </div>
    </animated.div>
  );
}

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.tknCookies);
    const db = firebase.firestore();

    let query = db.collection("projects");
    query = query.where(
      firebase.firestore.FieldPath.documentId(),
      "==",
      context.query.projectId
    );
    query = query.where("userId", "==", token.uid);
    const docs = await query.get();
    if (docs.docs.length === 0) {
      throw new Error();
    }
    return {
      props: { session: token },
    };
  } catch (err) {
    console.log(err, "project page");
    context.res.writeHead(302, { Location: "/" });
    return {
      props: {},
    };
  }
}
