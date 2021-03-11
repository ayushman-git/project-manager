import Image from "next/image";

import styles from "./StoryCard.module.scss";

const StoryCard = ({ story, selectedStory }) => {
  const clickHandler = (e) => {
    selectedStory(e, story.id);
  };
  return (
    <section className={`${styles.storyCard} card`}>
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
    </section>
  );
};

export default StoryCard;
