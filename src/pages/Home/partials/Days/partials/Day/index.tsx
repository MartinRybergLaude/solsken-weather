import { motion } from "framer-motion";

import Container from "~/components/Container";
import WeatherIcon from "~/components/WeatherIcon";
import { Day as DayType } from "~/types/formattedWeather";

import styles from "./Day.module.css";

interface DayProps {
  day: DayType;
}
function Day({ day }: DayProps) {
  return (
    <motion.div
      className={styles.root}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h3>{day.dayOfWeek}</h3>
      <div className={styles.card}>
        <Container>
          <>
            <WeatherIcon id={day.icon} />
            <div className={styles.temps}>
              <p className={styles.maxTemp}>{day.tempHigh}</p>
              <p className={styles.minTemp}>{day.tempLow}</p>
            </div>
          </>
        </Container>
      </div>
    </motion.div>
  );
}

export default Day;
