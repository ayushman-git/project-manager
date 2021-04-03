import styles from "./Hero.module.scss";
import LoginButtons from "../../LoginButtons/LoginButtons";

const Hero = () => {
  return (
    <div className={`${styles.heroView} maxWidth`}>
      <div className={styles.heroBanner}>
        <div className={styles.titleWrap}>
          <h1>PROTO</h1>
          <h2>Your personal project assistant</h2>
          <p>
            Create dozens of personal projects and track them easily with tools
            that are essential.
          </p>
        </div>
        <section className={styles.login}>
          <strong>LOGIN</strong>
          <LoginButtons />
        </section>
      </div>
    </div>
  );
};

export default Hero;
