import styles from "./AddProjectFAB.module.scss";
import Image from "next/image";

const AddProjectFAB = ({ FABClicked }) => {
  return (
    <div className={styles.FABWrap} onClick={FABClicked}>
      <Image
        src="/images/plus.svg"
        width={50}
        height={50}
        layout="responsive"
      />
    </div>
  );
};

export default AddProjectFAB;
