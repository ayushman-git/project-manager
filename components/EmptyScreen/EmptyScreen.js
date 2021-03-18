import Image from "next/image";

import styles from "./EmptyScreen.module.scss";

const EmptyScreen = () => {
  return (
    <div className={styles.emptyDiv}>
      <Image
        src={`/images/illustrations/i_${Math.floor(Math.random() * 7)}.svg`}
        height={300}
        width={300}
      />
      <h2>Add Projects</h2>
    </div>
  );
};

export default EmptyScreen;
