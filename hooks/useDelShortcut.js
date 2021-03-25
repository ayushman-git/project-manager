import firebase from "firebase/app";
import "firebase/firestore";

const useDelShortcut = (shortcuts, shortcutId, projectId) => {
  const db = firebase.firestore();
  const updatedShortcuts = shortcuts.filter(
    (project) => project.id !== shortcutId
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

export default useDelShortcut;
