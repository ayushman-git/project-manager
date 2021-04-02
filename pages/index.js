import { useEffect } from "react";
import { useRouter } from "next/router";
import { userAuth } from "../auth/auth";

import styles from "./index.module.scss";
import nookies from "nookies";

import Navbar from "../components/Navbar/Navbar";
import LoginButtons from "../components/LoginButtons/LoginButtons";
import Button from "../components/Button/Button";

const Home = () => {
  const router = useRouter();
  const { user } = userAuth();

  useEffect(() => {
    if (user) {
      router.push("/user/" + user.displayName.split(" ")[0].toLowerCase());
    }
  }, [user]);

  return (
    <div style={{ position: "relative", backgroundColor: "black" }}>
      <Navbar landing />
      <div className={`${styles.heroView} maxWidth`}>
        <div className={styles.heroBanner}>
          <div className={styles.titleWrap}>
            <h1>PROTO</h1>
            <h2>Your personal project assistant</h2>
            <p>
              Create dozens of personal projects and track them easily with
              tools that are essential.
            </p>
          </div>
          <section className={styles.login}>
            <strong>LOGIN</strong>
            <LoginButtons />
          </section>
        </div>
      </div>

      <div className={styles.openSourceWrap}>
        <section className={styles.openSourceContainer}>
          <h1>
            <span className={styles.openSourceLogo}>PROTO</span> is an
            open-source project
          </h1>
          <div className={styles.btnWrap}>
            <Button
              type="circle"
              image="/images/github.svg"
              link="https://github.com/ayushman-git/project-manager"
            />
            <Button
              type="circle"
              image="/images/medium.svg"
              link="https://javascript.plainenglish.io/proto-a-project-manager-made-with-next-js-da2d82eeee37"
            />
          </div>
        </section>
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
