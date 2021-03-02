import React, { useState } from "react";
import { verifyIdToken } from "../../auth/firebaseAdmin";
import firebaseClient from "../../auth/firebaseClient";
import firebase from "firebase";
import nookies from "nookies";
import { useRouter } from "next/router";

import Projects from "../../components/Projects/Projects";
import NavBar from "../../components/Navbar/Navbar";
import ProjectOverviewMain from "../../components/ProjectOverviewMain/ProjectOverviewMain";

export default function User({ session }) {
  let view;
  const [projects] = useState([
    {
      title: "Mitio",
      days: 4,
      theme: {
        start: "#C6426E",
        end: "#642B73",
      },
    },
    {
      title: "Penumbra",
      days: 10,
      theme: {
        start: "#0f3443",
        end: "#34e89e",
      },
    },
  ]);
  const router = useRouter();
  const signOut = async () => {
    await firebase.auth().signOut();
    router.push("/");
  };
  console.log(session);
  firebaseClient();
  if (session) {
    view = (
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <NavBar image={session.picture} />
        <ProjectOverviewMain />
        <Projects projects={projects} />
        <button onClick={signOut.bind(this)}>Sign Out</button>
      </div>
    );
  } else {
    router.push("/");
  }
  return <main>{view}</main>;
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
    context.res.writeHead(302, { location: "/ " });
    context.res.end();
    return {
      props: null,
    };
  }
}
