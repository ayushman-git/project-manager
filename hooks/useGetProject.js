import { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import useDaysLeft from "./useDaysLeft";

const useGetProject = (projectId, setProjectDetail) => {
  const db = firebase.firestore();
  useEffect(() => {
    let cancelled = false;
    let unsubscribe;
    if (projectId) {
      unsubscribe = db
        .collection("projects")
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
    }
    return () => {
      unsubscribe();
      cancelled = true;
    };
  }, [projectId]);
};

export default useGetProject;
