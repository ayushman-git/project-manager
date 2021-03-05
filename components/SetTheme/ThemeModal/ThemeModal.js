import theme from "../../../assets/theme";
import styles from "./ThemeModal.module.scss";

import Gradient from "./Gradient/Gradient";

const ThemeModal = ({ currentTheme, changeTheme, closeModal }) => {
  const gradients = theme.map((th, index) => (
    <Gradient theme={th} key={index} changeTheme={changeTheme} />
  ));
  return (
    <>
      <div
        className={styles.modal}
        style={{
          background: `linear-gradient(-90deg, ${currentTheme[0]}, ${currentTheme[1]})`,
        }}
      >
        <header>
          <h2>Pick a theme</h2>
        </header>
        <section className={styles.gradientsWrap}>{gradients}</section>
      </div>
      <div onClick={closeModal} className={styles.back}></div>
    </>
  );
};

export default ThemeModal;
