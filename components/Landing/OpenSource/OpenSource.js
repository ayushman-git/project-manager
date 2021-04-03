import Button from "../../Button/Button";
import styles from "./OpenSource.module.scss";

const OpenSource = () => {
  return (
    <div className={styles.openSourceWrap}>
      <section className={styles.openSourceContainer}>
        <h1>
          <span className={styles.openSourceLogo}>PROTO</span> is an open-source
          project
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
  );
};

export default OpenSource;
