import Image from "next/image";

import styles from "./LoginButtons.module.scss";
import loginWithProviders from "../../hooks/loginWithProviders";
import Button from "../Button/Button";

const LoginButtons = () => {
  const [googleLogin, githubLogin] = loginWithProviders();
  return (
    <>
      <Button
        event={googleLogin}
        type="circle"
        image="/images/google.svg"
        size={40}
      />
      <Button
        event={githubLogin}
        type="circle"
        image="/images/github.svg"
        size={40}
      />
      {/* <div className={styles.loginHolder} onClick={googleLogin}>
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
      </div> */}
    </>
  );
};

export default LoginButtons;
