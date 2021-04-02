import Image from "next/image";
import { useSpring, animated } from "react-spring";

import styles from "./LoginButtons.module.scss";
import loginWithProviders from "../../hooks/loginWithProviders";

const LoginButtons = () => {
  const [googleLogin, githubLogin] = loginWithProviders();
  return (
    <>
      <div className={styles.loginHolder} onClick={googleLogin}>
        <Image
          src="/images/google.svg"
          alt="google"
          width={20}
          height={20}
          layout="fixed"
        />
      </div>
      <div className={styles.loginHolder} onClick={githubLogin}>
        <Image
          src="/images/github.svg"
          alt="google"
          width={20}
          height={20}
          layout="fixed"
        />
      </div>
    </>
  );
};

export default LoginButtons;
