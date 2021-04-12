import Button from "../../Button/Button";
import styles from "./OpenSource.module.scss";
import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

const OpenSource = () => {
  const [starsSVGSs, setStarsSVGSs] = useState([]);
  let starView;
  const generateStars = () => {
    const stars = new Array(12).fill(0);
    const svgs = stars.map(() => {
      const style = {
        top: Math.floor(Math.random() * window.innerHeight),
        left: Math.floor(Math.random() * window.innerWidth),
      };
      return (
        <svg
          height={2 * 2}
          width={2 * 2}
          key={uuidv4()}
          className={styles.star}
          style={style}
        >
          <circle cx={2} cy={2} r={2} fill="white" />
        </svg>
      );
    });
    setStarsSVGSs(svgs);
  };

  useEffect(() => {
    generateStars();
  }, []);

  useEffect(() => {
    starView = <>{starsSVGSs}</>;
  }, [starsSVGSs]);

  return (
    <div className={styles.openSourceWrap}>
      {starView}
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
