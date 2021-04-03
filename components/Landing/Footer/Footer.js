import styles from "./Footer.module.scss";
import Button from "../../Button/Button";

const Footer = () => {
  return (
    <footer className={`${styles.footer} maxWidth`}>
      <div>
        <Button
          type="circle"
          image="/images/ayushman.svg"
          link="https://ayushman.me/"
          size={40}
        />
      </div>
    </footer>
  );
};

export default Footer;
