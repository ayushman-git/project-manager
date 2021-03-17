import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import nookies from "nookies";
import { verifyIdToken } from "../../../../auth/firebaseAdmin";
import firebaseClient from "../../../../auth/firebaseClient";
import firebase from "firebase";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSpring, animated } from "react-spring";
import useDaysLeft from "../../../../hooks/useDaysLeft";

import styles from "./index.module.scss";

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
    let cancelled = false;
    if (router.query?.projectId) {
      localStorage.setItem("projectId", projectId);
    }
    db.collection("projects")
      .where(firebase.firestore.FieldPath.documentId(), "==", projectId)
      .onSnapshot((doc) => {
        let project = {};
        doc.forEach((d) => {
          if (d.data()) {
            project = {
              ...d.data(),
              projectId: d.id,
              dueDate: useDaysLeft(d.data().dueDate),
            };
            if (!cancelled) setProjectDetail(project);
          }
        });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  let projectButtons = (
    <div className={styles.buttonWrap}>
      <button
        className="secondary-btn"
        onMouseDown={() => {
          setToggleProjectDel(true);
        }}
      >
        Delete
      </button>
      <button
        className="success-btn"
        onMouseDown={() => {
          setToggleProjectArchive(true);
        }}
      >
        Complete
      </button>
    </div>
  );

  const updateFirestore = (e, ref, field) => {
    const newData = e.currentTarget.textContent;
    db.collection("projects")
      .where(firebase.firestore.FieldPath.documentId(), "==", projectId)
      .get()
      .then((query) => {
        const pr = query.docs[0];
        pr.ref.update({
          [field]: newData,
        });
      });
    ref.current.contentEditable = false;
  };

  const makeEditable = (e, ref) => {
    ref.current.contentEditable = true;
    ref.current.focus();
  };

  const updateShortcuts = (shortcutUrl, platform) => {
    db.collection("projects")
      .where(firebase.firestore.FieldPath.documentId(), "==", projectId)
      .get()
      .then((query) => {
        const pr = query.docs[0];
        if (projectDetail.shortcuts) {
          pr.ref.update({
            shortcuts: [
              ...projectDetail.shortcuts,
              { platform, url: shortcutUrl, id: uuidv4() },
            ],
          });
        } else {
          pr.ref.update({
            shortcuts: [{ platform, url: shortcutUrl, id: uuidv4() }],
          });
        }
      });

    setToggleAddShortcut(false);
  };

  const delShortcutHandler = (e, id) => {
    const updatedShortcuts = projectDetail.shortcuts.filter(
      (project) => project.id !== id
    );

    db.collection("projects")
      .where(firebase.firestore.FieldPath.documentId(), "==", projectId)
      .get()
      .then((query) => {
        const pr = query.docs[0];
        pr.ref.update({
          shortcuts: updatedShortcuts,
        });
      });
  };

  const changeActiveStatus = async () => {
    if (projectDetail.active) {
      return;
    }

    let query = firebase.firestore().collection("projects");
    query = query.where("userId", "==", session.uid);
    query = query.where("active", "==", true);

    const docs = await Promise.all([
      query.get(),
      db
        .collection("projects")
        .where(firebase.firestore.FieldPath.documentId(), "==", projectId)
        .get(),
    ]);
    const alreadyActive = docs[0];
    const toBeActive = docs[1];
    alreadyActive.docs[0].ref.update({ active: false });
    toBeActive.docs[0].ref.update({ active: true });
  };

  const delProject = async () => {
    if (projectDetail.active) {
      let query = db.collection("projects");
      query = query.where("userId", "==", session.uid);
      query = query.where("active", "==", false);
      query = query.where("archive", "==", false);
      const docs = await Promise.all([
        query.get(),
        db
          .collection("projects")
          .where(
            firebase.firestore.FieldPath.documentId(),
            "==",
            projectDetail.projectId
          )
          .get(),
      ]);
      const makeItActive = docs[0];
      const deleteThisDoc = docs[1];
      if (makeItActive.docs.length) {
        makeItActive.docs[0].ref.update({ active: true });
      }
      deleteThisDoc.docs[0].ref.delete();
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
          pr.ref.delete();
        });
    }

    router.back();
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
        updateShortcuts={updateShortcuts}
      />
    );
  }
  if (Object.keys(projectDetail).length > 0) {
    const header = (
      <header className={styles.header}>
        <div className={styles.titleWithAddOns}>
          <h1
            ref={titleRef}
            onDoubleClick={(e) => makeEditable(e, titleRef)}
            onBlur={(e) => updateFirestore(e, titleRef, "projectName")}
          >
            {projectDetail.projectName}
          </h1>
          <span className={styles.tag}>
            #
            <span
              ref={tagRef}
              onBlur={(e) => updateFirestore(e, tagRef, "tag")}
              onDoubleClick={(e) => makeEditable(e, tagRef)}
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
          <Image
            src={
              projectDetail.active
                ? "/images/star-fill.svg"
                : "/images/star.svg"
            }
            width={20}
            height={20}
            onClick={changeActiveStatus}
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
              delShortcut={delShortcutHandler}
            />
          )}

          <Image
            src="/images/plus.svg"
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
            onBlur={(e) => updateFirestore(e, descriptionRef, "description")}
            onDoubleClick={(e) => makeEditable(e, descriptionRef)}
          >
            {projectDetail.description}
          </div>

          <aside className={styles.stats}>
            <div className={`${styles.statCard} card`}>
              <TasksCompleted stories={projectDetail.stories} />
            </div>
            <div className={`${styles.statCard} card`}>
              <StoriesCompleted stories={projectDetail.stories} />
            </div>
          </aside>
        </div>
      </section>
    );
    projectView = (
      <section className={styles.projectWrap}>
        {header}
        {info}
        {addShortcutModal}
        <hr className={styles.divider} />
        <h2 style={{ textAlign: "center" }}>Scrum Board</h2>
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
            confirmDel={() => {
              delProject();
              setToggleProjectDel(false);
            }}
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
    context.res.end();
    return {
      props: {},
    };
  }
}
