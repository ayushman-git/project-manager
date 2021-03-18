import styles from "./ProjectModify.module.scss";

const ProjectModify = ({ delToggle, archiveToggle }) => {
  return (
    <div className={styles.buttonWrap}>
      <button className="secondary-btn" onClick={delToggle}>
        Delete
      </button>
      <button className="success-btn" onClick={archiveToggle}>
        Complete
      </button>
    </div>
  );
};

export default ProjectModify;
