import React, { useEffect, useState } from "react";
import nookies from "nookies";
import { verifyIdToken } from "../../../auth/firebaseAdmin";
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
import EditProjectModal from "../../../../components/AddProjectModal/AddProjectModal";

export default function project({ session }) {
  const [projectDetail, setProjectDetail] = useState({});
  const [shortcutUrl, setShortcutUrl] = useState("");
  const [platform, setPlatform] = useState("other");
  const [toggleAddShortcut, setToggleAddShortcut] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);

  const router = useRouter();
  const db = firebase.firestore();
  let projectId = router.query?.projectId || localStorage.getItem("projectId");
  let projectView = <h1>Loading...</h1>;
  let addShortcutModal;

  useEffect(() => {
    if (router.query?.projectId) {
      localStorage.setItem("projectId", projectId);
    }
    (async () => {
      db.collection("projects")
        .where(firebase.firestore.FieldPath.documentId(), "==", projectId)
        .onSnapshot((doc) => {
          let project = {};
          doc.forEach((d) => {
            if (d.data()) {
              project = {
                ...d.data(),
                dueDate: useDaysLeft(d.data().dueDate),
              };
              setProjectDetail(project);
            }
          });
        });
    })();
  }, []);

  const updateShortcuts = (e) => {
    e.preventDefault();
    db.collection("projects")
      .where(firebase.firestore.FieldPath.documentId(), "==", projectId)
      .get()
      .then((query) => {
        const pr = query.docs[0];
        const prevShortcutsJson = JSON.parse(projectDetail.shortcuts);
        pr.ref.update({
          shortcuts: JSON.stringify([
            ...prevShortcutsJson,
            { platform, url: shortcutUrl },
          ]),
        });
      });
  };

  if (toggleAddShortcut) {
    addShortcutModal = (
      <Modal closeModal={() => setToggleAddShortcut(false)}>
        <header>
          <h3>Add Shortcut</h3>
        </header>
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
            <h1>{projectDetail.projectName}</h1>
            <span className={styles.tag}>#{projectDetail.tag}</span>
            <DueDate days={projectDetail.dueDate} className={styles.dueDate} />
          </div>

          <SetTheme
            currentTheme={projectDetail.theme}
            projectId={
              router.query.projectId || localStorage.getItem("projectId")
            }
          />
        </header>
        <section className={styles.info}>
          <section className={styles.shortcutsWrap}>
            <Shortcuts shortcuts={JSON.parse(projectDetail.shortcuts)} />

            <Image
              src="/images/plus.svg"
              width={15}
              height={15}
              className={styles.addShortcut}
              onClick={() => setToggleAddShortcut(true)}
            />
          </section>
          <article className={styles.description}>
            {projectDetail.description}
          </article>
        </section>
        {addShortcutModal}
      </section>
    );
  }

  return (
    <div
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
