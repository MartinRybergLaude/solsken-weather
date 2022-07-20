import styles from "./Days.module.css";
import Day from "./partials/Day";

function Days() {
  return (
    <div className={styles.root}>
      <Day />
    </div>
  );
}

export default Days;
