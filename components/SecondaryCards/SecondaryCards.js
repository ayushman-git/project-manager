import React from "react";
import { useRouter } from "next/router";
import { useSpring, animated } from "react-spring";
import Link from "next/link";

import styles from "./SecondaryCards.module.scss";
import DueDate from "../DueDate/DueDate";

export default function SecondaryCards(props) {
  const router = useRouter();
  const onMountTransition = useSpring({
    from: { opacity: 0, transform: "scale(0.4)" },
    opacity: 1,
    transform: "scale(1)",
  });
  return (
    <animated.div style={onMountTransition}>
      <Link
        href={{
          pathname: `${router.asPath}/${props.projectName.toLowerCase()}`,
          query: { projectId: props.projectId },
        }}
        // as={`${router.asPath}/${props.projectName.toLowerCase()}`}
      >
        <section
          className={styles.card}
          style={{
            background: `linear-gradient(-45deg, ${props.theme[0]}, ${props.theme[1]})`,
          }}
        >
          <h3>{props.title}</h3>
          <DueDate days={props.days} />
        </section>
      </Link>
    </animated.div>
  );
}
