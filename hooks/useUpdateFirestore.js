import firebase from "firebase";

const updateFirestore = (e, ref, field, projectId) => {
  const newData = e.currentTarget.textContent;
  const db = firebase.firestore();
  db.collection("projects")
    .where(firebase.firestore.FieldPath.documentId(), "==", projectId)
    .get()
    .then((query) => {
      const pr = query.docs[0];
      pr.ref.update({
        [field]: newData,
      });
    });
  ref.current.contentEditable = false;
};

export default updateFirestore;
