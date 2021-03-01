import Head from "next/head";
import Image from "next/image";
import styles from "./index.module.scss";
import firebaseClient from "../auth/firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";

const Home = () => {
  const loginViaGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    logInWithProvider(provider);
  };
  const loginViaFacebook = async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    logInWithProvider(provider);
  };
  const loginViaGithub = async () => {
    const provider = new firebase.auth.GithubAuthProvider();
    logInWithProvider(provider);
  };

  const logInWithProvider = (provider) => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const credential = result.credential;
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };
  return (
    <>
      <div className={styles.bgHero}>
        <img src="/images/bg_hero.svg" alt="" />
      </div>
      <section className={styles.cardWrap}>
        <div className={styles.titleWrap}>
          <h1>Project Manager</h1>
          <p>You personal project assistant</p>
        </div>
        <section className={styles.card}>
          <header>Login / Sigup</header>
          <ul className={styles.loginWrap}>
            <li>
              <Image
                onClick={loginViaGoogle.bind(this)}
                src="/images/google.svg"
                alt="google"
                width={80}
                height={40}
                layout="fixed"
                tabIndex={0}
              />
            </li>
            <li>
              <Image
                onClick={loginViaFacebook.bind(this)}
                src="/images/facebook.svg"
                alt="google"
                width={80}
                height={40}
                layout="fixed"
                tabIndex={0}
              />
            </li>
            <li>
              <Image
                onClick={loginViaGithub.bind(this)}
                src="/images/github.svg"
                alt="google"
                width={80}
                height={42}
                layout="fixed"
                tabIndex={0}
              />
            </li>
          </ul>
        </section>
      </section>
    </>
  );
};

export default Home;
