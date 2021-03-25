import { v4 as uuidv4 } from "uuid";
import firebase from "firebase/app";
import "firebase/firestore";

const updateShortcuts = (
  shortcuts,
  shortcutUrl,
  platform,
  projectId,
  toggleOff
) => {
  const db = firebase.firestore();

  db.collection("projects")
    .where(firebase.firestore.FieldPath.documentId(), "==", projectId)
    .get()
    .then((query) => {
      const pr = query.docs[0];
      if (shortcuts) {
        pr.ref.update({
          shortcuts: [
            ...shortcuts,
            { platform, url: shortcutUrl, id: uuidv4() },
          ],
        });
      } else {
        pr.ref.update({
          shortcuts: [{ platform, url: shortcutUrl, id: uuidv4() }],
        });
      }
    });

  toggleOff(false);
};

export default updateShortcuts;
