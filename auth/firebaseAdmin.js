const admin = require("firebase-admin");

export const verifyIdToken = (token) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        type: "service_account",
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        auth_uri: process.env.AUTH_URI,
        token_uri: process.env.TOKEN_URL,
        auth_provider_x509_cert_url: process.env.AUTH_PROVIDER,
        client_x509_cert_url: process.env.CLIENT_CERT_URL,
      }),
    });
  }
  return admin
    .auth()
    .verifyIdToken(token)
    .catch((err) => console.log(err));
};
