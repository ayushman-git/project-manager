import styles from "./StoryCard.module.scss";

const StoryCard = () => {
  return (
    <section className={styles.card}>
      <article>
        <p>User can add stories in scrum board</p>
      </article>
      <footer>Add +</footer>
    </section>
  );
};

export default StoryCard;
