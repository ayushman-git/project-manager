import Head from "next/head";
import Image from "next/image";
import styles from "./index.module.scss";

const Home = () => {
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
                src="/images/google.svg"
                alt="google"
                width={80}
                height={40}
                layout="fixed"
              />
            </li>
            <li>
              <Image
                src="/images/facebook.svg"
                alt="google"
                width={80}
                height={40}
                layout="fixed"
              />
            </li>
            <li>
              <Image
                src="/images/github.svg"
                alt="google"
                width={80}
                height={40}
                layout="fixed"
              />
            </li>
          </ul>
        </section>
      </section>
    </>
  );
};

export default Home;
