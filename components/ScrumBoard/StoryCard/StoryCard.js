import { useState, useRef } from "react";
import Image from "next/image";

import DelModal from "../DelModal/DelModal";
import styles from "./StoryCard.module.scss";

const StoryCard = ({ story, selectedStory, delStory, updateStory }) => {
  const [toggleStoryDelModal, setToggleStoryDelModal] = useState(false);
  const descriptionRef = useRef();

  const makeEditable = (e, ref) => {
    ref.current.contentEditable = true;
    ref.current.focus();
  };

  const updateFirestore = (e, ref) => {
    updateStory(e, ref, story.id);
  };

  const clickHandler = (e) => {
    selectedStory(e, story.id);
  };

  const middleMouseHandler = (e) => {
    if (e.button === 1) {
      setToggleStoryDelModal(true);
    }
  };
  return (
    <>
      <section
        className={`${styles.storyCard} card`}
        onMouseDown={middleMouseHandler}
      >
        <article>
          <p
            ref={descriptionRef}
            onDoubleClick={(e) => makeEditable(e, descriptionRef)}
            onBlur={(e) => updateFirestore(e, descriptionRef)}
          >
            {story.description}
          </p>
        </article>
        <aside className={styles.addWrap} onClick={clickHandler}>
          <Image
            className={styles.add}
            src="/images/plus.svg"
            height={15}
            width={15}
          />
        </aside>
      </section>
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
    </>
  );
};

export default StoryCard;
