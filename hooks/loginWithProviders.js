import firebase from "firebase/app";
import "firebase/auth";

const loginViaGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  logInWithProvider(provider);
};

const loginViaGithub = () => {
  const provider = new firebase.auth.GithubAuthProvider();
  logInWithProvider(provider);
};

const logInWithProvider = (provider) => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .catch((error) => {
      console.log(error);
    });
};

export default function login() {
  return [loginViaGoogle, loginViaGithub];
}
