import firebase from "firebase";

const useChangeStatus = async (active, userId, projectId) => {
  const db = firebase.firestore();

  if (active) {
    return;
  }

  let query = db.collection("projects");
  query = query.where("userId", "==", userId);
  query = query.where("active", "==", true);

  const docs = await Promise.all([
    query.get(),
    db
      .collection("projects")
      .where(firebase.firestore.FieldPath.documentId(), "==", projectId)
      .get(),
  ]);
  const alreadyActive = docs[0];
  const toBeActive = docs[1];
  alreadyActive.docs[0].ref.update({ active: false });
  toBeActive.docs[0].ref.update({ active: true });
};

export default useChangeStatus;
