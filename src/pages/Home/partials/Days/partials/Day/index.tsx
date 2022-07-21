import SunnySVG from "~/assets/weather/clear-day.svg";
import Card from "~/components/Card";
import Container from "~/components/Container";

import styles from "./Day.module.css";

function Day() {
  return (
    <div className={styles.root}>
      <h3>Today</h3>
      <Card className={styles.card}>
        <Container>
          <SunnySVG />
          <div className={styles.temps}>
            <p className={styles.maxTemp}>21</p>
            <p className={styles.minTemp}>22</p>
          </div>
        </Container>
      </Card>
    </div>
  );
}

export default Day;
