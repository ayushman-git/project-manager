import styles from "./EventCompleted.module.scss";

const EventCompleted = ({ completed, total }) => {
  return (
    <div className={styles.eventWrap}>
      <span className={styles.completed}>{completed}</span>
      <span>/</span>
      <span className={styles.total}>{total}</span>
    </div>
  );
};

export default EventCompleted;
