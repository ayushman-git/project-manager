import React, { useEffect, useState } from "react";
import nookies from "nookies";
import firebase from "firebase";
import Navbar from "../../../components/Navbar/Navbar";
import { useRouter } from "next/router";

export default function project({ session }) {
  const [projectDetail, setProjectDetail] = useState({});
  const router = useRouter();
  const db = firebase.firestore();
  console.log(router.query.projectId);

  useEffect(() => {
    (async () => {
      db.collection("projects")
        .where(firebase.firestore.FieldPath.documentId(), "==", session.uid)
        .onSnapshot((snapshotOfProject) => {
          console.log(snapshotOfProject);
          // setProjectDetail(snapshotOfProject[0]);
        });
    })();
  }, []);

  useEffect(() => {
    console.log(projectDetail);
  });
  return (
    <div className="maxWidth">
      <Navbar image={session.picture} />
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
