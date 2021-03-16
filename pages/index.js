import Image from "next/image";
import styles from "./index.module.scss";
import firebase from "firebase/app";
import "firebase/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Home = () => {
  const router = useRouter();
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

  useEffect(() => {
    Cookies.remove("tknCookies");
  }, []);

  const logInWithProvider = (provider) => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const credential = result.credential;
        const token = credential.accessToken;
        const user = result.user;
        router.push("/user/" + user.displayName.split(" ")[0].toLowerCase());
      })
      .catch((error) => {
        console.log(error);
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
