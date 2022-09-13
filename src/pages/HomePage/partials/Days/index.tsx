import { AnimatePresence } from "framer-motion";

import { useWeather } from "~/contexts/WeatherContext";

import styles from "./Days.module.css";
import Day from "./partials/Day";

function Days() {
  const { weather, loading, setSelectedDay, selectedDay } = useWeather();
  const days = weather?.formatted?.days;
  return (
    <div className={styles.root}>
      <div className={styles.scrollContainer}>
        <AnimatePresence>
          {!loading &&
            days?.map((day, index) => (
              <Day
                key={index}
                day={day}
                index={index}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
              />
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Days;
