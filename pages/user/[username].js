import React from "react";
import { verifyIdToken } from "../../auth/firebaseAdmin";
import firebaseClient from "../../auth/firebaseClient";
import firebase from "firebase";
import nookies from "nookies";
import { useRouter } from "next/router";

import NavBar from "../../components/Navbar/Navbar";
import ProjectOverviewMain from "../../components/ProjectOverviewMain/ProjectOverviewMain";

export default function User({ session }) {
  const router = useRouter();
  const signOut = async () => {
    await firebase.auth().signOut();
    router.push("/");
  };
  console.log(session);
  firebaseClient();
  if (session) {
    return (
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <NavBar image={session.picture} />
        <ProjectOverviewMain />
        <button onClick={signOut.bind(this)}>Sign Out</button>
      </div>
    );
  } else {
    router.push("/");
  }
}

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    return {
      props: {
        session: token || null,
      },
    };
  } catch (err) {
    console.log(err);
  }
}
