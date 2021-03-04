import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import styles from "./ProjectButton.module.scss";

export default function PreviousButton() {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <div className={styles.previousButtonWrap} onClick={goBack}>
      <Image src="/images/previous.svg" width={20} height={20} />
    </div>
  );
}
