import { useState, useEffect } from "react";
import useDaysLeft from "./useDaysLeft";
import firebase from "firebase/app";
import "firebase/firestore";

const getProjectDetails = async (userId) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const db = firebase.firestore();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      let query = db.collection("projects");
      query = query.where("userId", "==", userId);
      query = query.where("archive", "==", false);
      query.onSnapshot((snapshotOfProjects) => {
        const projects = [];
        snapshotOfProjects.forEach((doc) => {
          projects.push({
            ...doc.data(),
            projectId: doc.id,
            dueDate: useDaysLeft(doc.data().dueDate),
          });
        });
        if (!cancelled) {
          setProjects(projects);
          setLoading(false);
        }
      });
    })();
    return () => (cancelled = true);
  }, []);
  return [projects, loading];
};
export default getProjectDetails;
