import { useEffect } from "react";
import firebase from "firebase";
import useDaysLeft from "./useDaysLeft";

const useGetProject = (projectId, setProjectDetail) => {
  const db = firebase.firestore();
  useEffect(() => {
    let cancelled = false;
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
};

export default useGetProject;
