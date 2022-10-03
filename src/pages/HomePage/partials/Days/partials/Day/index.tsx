import { Link } from "react-router-dom";
import cx from "classnames";
import { motion } from "framer-motion";

import Container from "~/components/Container";
import WeatherIcon from "~/components/WeatherIcon";
import { Day as DayType } from "~/types/formattedWeather";

import styles from "./Day.module.css";

interface DayProps {
  day: DayType;
  index: number;
  setSelectedDay: (day: number) => void;
  selectedDay: number;
}
function Day({ day, index, setSelectedDay, selectedDay }: DayProps) {
  return (
    <motion.div
      className={styles.root}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h3>{day.dayOfWeek}</h3>
      <Link className={cx(styles.card, styles.link)} to={`/hours/${index}`}>
        <Container>
          <>
            <WeatherIcon id={day.icon} />
            <div className={styles.temps}>
              <p className={styles.maxTemp}>{day.tempHigh}</p>
              <p className={styles.minTemp}>{day.tempLow}</p>
            </div>
          </>
        </Container>
      </Link>
      <button
        className={cx(styles.card, styles.button, selectedDay === index && styles.selected)}
        onClick={() => setSelectedDay(index)}
      >
        <Container>
          <>
            <WeatherIcon id={day.icon} />
            <div className={styles.temps}>
              <p className={styles.maxTemp}>{day.tempHigh}</p>
              <p className={styles.minTemp}>{day.tempLow}</p>
            </div>
          </>
        </Container>
      </button>
    </motion.div>
  );
}

export default Day;
