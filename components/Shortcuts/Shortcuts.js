import React from "react";
import Shortcut from "./Shortcut/Shortcut";
import styles from "./Shortcuts.module.scss";

export default function Shortcuts(props) {
  let shortcuts;
  if (props.shortcuts.length) {
    shortcuts = props.shortcuts.map((shortcut, index) => (
      <Shortcut
        key={index}
        title={shortcut.platform}
        url={shortcut.url}
        image={`/images/${shortcut.platform}.svg`}
      />
    ));
  }
  return <section className={styles.shortcutsWrap}>{shortcuts}</section>;
}
