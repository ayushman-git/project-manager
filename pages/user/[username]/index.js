import React, { useState, useEffect } from "react";
import { verifyIdToken } from "../../../auth/firebaseAdmin";
import firebaseClient from "../../../auth/firebaseClient";
import firebase from "firebase";
import nookies from "nookies";

import Projects from "../../../components/Projects/Projects";
import Navbar from "../../../components/Navbar/Navbar";
import ProjectOverviewMain from "../../../components/ProjectOverviewMain/ProjectOverviewMain";

export default function User({ session }) {
  const [projects, setProjects] = useState([]);

  let view;
  const db = firebase.firestore();
  const getDaysLeft = (firestoreDays) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const today = new Date();
    const diffDays = Math.round(
      Math.abs((today - new Date(firestoreDays)) / oneDay)
    );
    return diffDays;
  };

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
              dueDate: getDaysLeft(doc.data().dueDate.toDate()),
            });
          });
          setProjects(projects);
        });
    })();
  }, []);

  firebaseClient();
  if (session && projects.length) {
    const activeProject = projects.find((pr) => pr.active);
    console.log(activeProject);
    view = (
      <div className="maxWidth">
        <Navbar image={session.picture} />
        <ProjectOverviewMain project={activeProject} />
        <Projects projects={projects.filter((pr) => !pr.active)} />
      </div>
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
    nookies.set(context, "session", JSON.stringify(token), {});
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
      props: null,
    };
  }
}
