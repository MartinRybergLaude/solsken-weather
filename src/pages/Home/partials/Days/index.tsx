import { AnimatePresence } from "framer-motion";

import { useWeather } from "~/contexts/WeatherContext";

import styles from "./Days.module.css";
import Day from "./partials/Day";

function Days() {
  const { weather } = useWeather();
  const days = weather?.formatted?.days;
  return (
    <div className={styles.root}>
      <div className={styles.scrollContainer}>
        <AnimatePresence>
          {days && days.map((day, index) => <Day key={index} day={day} />)}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Days;
