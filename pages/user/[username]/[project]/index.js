import React, { useEffect, useState } from "react";
import nookies from "nookies";
import firebase from "firebase";
import { useRouter } from "next/router";
import Image from "next/image";

import styles from "./index.module.scss";

import SetTheme from "../../../../components/SetTheme/SetTheme";
import Navbar from "../../../../components/Navbar/Navbar";
import DueDate from "../../../../components/DueDate/DueDate";
import Shortcuts from "../../../../components/Shortcuts/Shortcuts";

export default function project({ session }) {
  const [projectDetail, setProjectDetail] = useState({});
  const router = useRouter();
  const db = firebase.firestore();
  let projectId = null;
  let projectView = <h1>Loading...</h1>;

  const getDaysLeft = (firestoreDays) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const today = new Date();
    const diffDays = Math.round(
      Math.abs((today - new Date(firestoreDays)) / oneDay)
    );
    return diffDays;
  };
  useEffect(() => {
    if (router?.query?.projectId) {
      projectId = router.query.projectId;
      localStorage.setItem("projectId", projectId);
    }
    (async () => {
      db.collection("projects")
        .where(
          firebase.firestore.FieldPath.documentId(),
          "==",
          router.query.projectId || localStorage.getItem("projectId")
        )
        .onSnapshot((doc) => {
          let project = {};
          doc.forEach((d) => {
            if (d.data()) {
              project = {
                ...d.data(),
                dueDate: getDaysLeft(d.data().dueDate.toDate()),
              };
              setProjectDetail(project);
            }
          });
        });
    })();
  }, []);

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
            <Image src="/images/plus.svg" width={15} height={15} />
          </section>
          <article className={styles.description}>
            {projectDetail.description}
          </article>
        </section>
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
    const session = cookies.session;
    return {
      props: { session: JSON.parse(session) },
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
