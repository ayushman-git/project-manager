const admin = require("firebase-admin");
const serviceAccount = require("./pm-auth.json");

export const vertifyIdToken = (token) => {
  if (!firebase.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  return admin
    .auth()
    .verifyIdToken(token)
    .catch((err) => console.log(err));
};
