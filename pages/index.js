import { useEffect } from "react";
import { useRouter } from "next/router";
import { userAuth } from "../auth/auth";

import styles from "./index.module.scss";
import nookies from "nookies";

import Navbar from "../components/Navbar/Navbar";
import LoginButtons from "../components/LoginButtons/LoginButtons";

const Home = () => {
  const router = useRouter();
  const { user } = userAuth();

  useEffect(() => {
    if (user) {
      router.push("/user/" + user.displayName.split(" ")[0].toLowerCase());
    }
  }, [user]);

  return (
    <div style={{ position: "relative" }}>
      <Navbar landing />
      <div className={`${styles.heroView} maxWidth`}>
        <div className={styles.heroBanner}>
          <div className={styles.titleWrap}>
            <h1>PROTO</h1>
            <h2>Your personal project assistant</h2>
            <p>
              Create dozens of perosnal projects and track them easily with
              tools that are essential.
            </p>
          </div>
          <section className={styles.login}>
            <strong>LOGIN</strong>
            <LoginButtons />
          </section>
        </div>
      </div>

      <div className={styles.heroBg}>
        <video
          className={styles.bgVid}
          src="/video/home_bg.mp4"
          muted
          loop
          autoPlay
        ></video>
        <div className={styles.overlay}></div>
      </div>

      {/* <div className={`${styles.homeWrap} maxWidth`}>
        <section className={styles.cardWrap}>
          <div className={styles.titleWrap}>
            <h1>PROTO</h1>
            <p>Your personal project assistant</p>
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
      </div> */}
    </div>
  );
};

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const { user } = cookies;
  if (user) {
    context.res.setHeader(
      "location",
      `/user/${user.split(" ")[0].toLowerCase()}`
    );
    context.res.statusCode = 302;
    return { props: {} };
  }
  return { props: {} };
}

export default Home;
