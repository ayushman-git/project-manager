import styles from "./ScrumBoard.module.scss";

import StoryCard from "./StoryCard/StoryCard";
import Tasks from "./Tasks/Tasks";

const ScrumBoard = () => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.stories}>Stories</th>
          <th>Not Started</th>
          <th>Doing</th>
          <th>Done</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <StoryCard />
          </td>
          <td>
            <Tasks />
          </td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>
            <StoryCard />
          </td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th>3</th>
          <td>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ScrumBoard;
