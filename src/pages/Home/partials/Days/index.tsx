import styles from "./Days.module.css";
import Day from "./partials/Day";

function Days() {
  return (
    <div className={styles.root}>
      <div className={styles.scrollContainer}>
        <Day />
        <Day />
        <Day />
        <Day />
        <Day />
        <Day />
        <Day />
        <Day />
      </div>
    </div>
  );
}

export default Days;
