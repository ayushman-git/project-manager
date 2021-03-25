import firebase from "firebase/app";
import "firebase/firestore";

const delProject = async (active, projectId, userId) => {
  const db = firebase.firestore();
  if (active) {
    let query = db.collection("projects");
    query = query.where("userId", "==", userId);
    query = query.where("active", "==", false);
    query = query.where("archive", "==", false);
    const docs = await Promise.all([
      query.get(),
      db
        .collection("projects")
        .where(firebase.firestore.FieldPath.documentId(), "==", projectId)
        .get(),
    ]);
    const makeItActive = docs[0];
    const deleteThisDoc = docs[1];
    if (makeItActive.docs.length) {
      makeItActive.docs[0].ref.update({ active: true });
    }
    deleteThisDoc.docs[0].ref.delete();
  } else {
    db.collection("projects")
      .where(firebase.firestore.FieldPath.documentId(), "==", projectId)
      .get()
      .then((query) => {
        const pr = query.docs[0];
        pr.ref.delete();
      });
  }
};

export default delProject;
