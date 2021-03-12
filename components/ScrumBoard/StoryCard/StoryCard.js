import { useState } from "react";
import Image from "next/image";

import DelModal from "../DelModal/DelModal";
import styles from "./StoryCard.module.scss";

const StoryCard = ({ story, selectedStory, delStory }) => {
  const [toggleStoryDelModal, setToggleStoryDelModal] = useState(false);
  const clickHandler = (e) => {
    selectedStory(e, story.id);
  };

  const middleMouseHandler = (e) => {
    if (e.button === 1) {
      setToggleStoryDelModal(true);
    }
  };
  return (
    <section
      className={`${styles.storyCard} card`}
      onMouseDown={middleMouseHandler}
    >
      <article>
        <p>{story.description}</p>
      </article>
      <footer>
        <Image
          onClick={clickHandler}
          className={styles.add}
          src="/images/plus.svg"
          height={15}
          width={15}
        />
      </footer>
      {toggleStoryDelModal && (
        <DelModal
          closeModal={() => setToggleStoryDelModal(false)}
          confirmDel={() => {
            delStory(story.id);
            setToggleStoryDelModal(false);
          }}
          message="Delete Story?"
        />
      )}
    </section>
  );
};

export default StoryCard;
