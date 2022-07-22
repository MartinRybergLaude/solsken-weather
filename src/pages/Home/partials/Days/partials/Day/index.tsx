import Card from "~/components/Card";
import Container from "~/components/Container";
import WeatherIcon from "~/components/WeatherIcon";
import { Day as DayType } from "~/types/formattedWeather";

import styles from "./Day.module.css";

interface DayProps {
  day: DayType;
}
function Day({ day }: DayProps) {
  console.log("icon", day.icon);
  return (
    <div className={styles.root}>
      <h3>{day.dayOfWeek}</h3>
      <Card className={styles.card}>
        <Container>
          <>
            <WeatherIcon id={day.icon} />
            <div className={styles.temps}>
              <p className={styles.maxTemp}>{day.tempHigh}</p>
              <p className={styles.minTemp}>{day.tempLow}</p>
            </div>
          </>
        </Container>
      </Card>
    </div>
  );
}

export default Day;
