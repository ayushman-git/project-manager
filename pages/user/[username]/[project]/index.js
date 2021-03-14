import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import nookies from "nookies";
import { verifyIdToken } from "../../../../auth/firebaseAdmin";
import firebase from "firebase";
import { useRouter } from "next/router";
import Image from "next/image";
import useDaysLeft from "../../../../hooks/useDaysLeft";

import styles from "./index.module.scss";

import SetTheme from "../../../../components/SetTheme/SetTheme";
import Navbar from "../../../../components/Navbar/Navbar";
import DueDate from "../../../../components/DueDate/DueDate";
import Shortcuts from "../../../../components/Shortcuts/Shortcuts";
import Modal from "../../../../components/Modal/Modal";
import ScrumBoard from "../../../../components/ScrumBoard/ScrumBoard";
import DelModal from "../../../../components/ScrumBoard/DelModal/DelModal";

export default function project({ session }) {
  const [projectDetail, setProjectDetail] = useState({});
  const [shortcutUrl, setShortcutUrl] = useState("");
  const [platform, setPlatform] = useState("other");
  const [toggleAddShortcut, setToggleAddShortcut] = useState(false);
  const [toggleProjectDel, setToggleProjectDel] = useState(false);
  const [toggleProjectArchive, setToggleProjectArchive] = useState(false);

  const router = useRouter();
  const db = firebase.firestore();

  const descriptionRef = useRef();
  const titleRef = useRef();
  const tagRef = useRef();

  let projectId = router.query?.projectId || localStorage.getItem("projectId");
  let projectView = <h1>Loading...</h1>;
  let addShortcutModal;

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

  const updateShortcuts = (e) => {
    e.preventDefault();
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
    setPlatform("other");
    setShortcutUrl("");
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
      let query = firebase.firestore().collection("projects");
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
    // if (projectDetail.active) {
    //   let query = firebase.firestore().collection("projects");
    //   query = query.where("userId", "==", session.uid);
    //   query = query.where("active", "==", true);
    //   let queryTwo = firebase.firestore().collection("projects");
    //   queryTwo = queryTwo.where("userId", "==", session.uid);
    //   queryTwo = queryTwo.where("active", "==", true);
    //   const docs = await Promise.all([query.get(), queryTwo.get()]);
    //   const alreadyActive = docs[0];
    //   const toBeActive = docs[1];
    //   // console.log(alreadyActive);
    //   console.log(toBeActive);
    //   // alreadyActive.docs[0].ref.update({ active: false, archive: true });
    //   // toBeActive.docs[0].ref.update({ active: true });
    // }
  };

  if (toggleAddShortcut) {
    addShortcutModal = (
      <Modal
        closeModal={() => setToggleAddShortcut(false)}
        headerMessage="Add Shortcut"
      >
        <form>
          <label>
            Platform:
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option value="other">Other</option>
              <option value="trello">Trello</option>
              <option value="figma">Figma</option>
              <option value="xd">Adobe XD</option>
              <option value="firebase">Firebase</option>
            </select>
          </label>
          <label>
            <input
              type="text"
              value={shortcutUrl}
              onChange={(e) => setShortcutUrl(e.target.value)}
            />
          </label>
          <button onClick={updateShortcuts}>Submit</button>
        </form>
      </Modal>
    );
  }

  if (Object.keys(projectDetail).length > 0) {
    projectView = (
      <section className={styles.projectWrap}>
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
          <div
            className={styles.description}
            ref={descriptionRef}
            onBlur={(e) => updateFirestore(e, descriptionRef, "description")}
            onDoubleClick={(e) => makeEditable(e, descriptionRef)}
          >
            {projectDetail.description}
          </div>
        </section>
        {addShortcutModal}
      </section>
    );
  }

  return (
    <div
      className={styles.wrap}
      style={
        Object.keys(projectDetail).length > 0
          ? {
              background: `linear-gradient(-45deg, ${projectDetail.theme[0]}, ${projectDetail.theme[1]})`,
            }
          : {}
      }
    >
      <div className="maxWidth">
        <Navbar image={session.picture} />
        {projectView}
        <ScrumBoard stories={projectDetail.stories} projectId={projectId} />
        <div>
          <button
            onMouseDown={() => {
              setToggleProjectDel(true);
            }}
          >
            Delete
          </button>
          <button
            onMouseDown={() => {
              setToggleProjectArchive(true);
            }}
          >
            Complete
          </button>
        </div>
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
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    return {
      props: { session: token },
    };
  } catch (err) {
    console.log(err);
    context.res.writeHead(302, { location: "/" });
    context.res.end();
    return {
      props: null,
    };
  }
}
