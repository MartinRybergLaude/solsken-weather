import { FiUmbrella, FiWind } from "react-icons/fi";
import { FiMenu } from "react-icons/fi";

import { ReactComponent as BarometerIcon } from "~/assets/monochrome/barometer.svg";
import Card from "~/components/Card";
import Container from "~/components/Container";
import Icon from "~/components/Icon";
import { useWeather } from "~/contexts/WeatherContext";

import GraphSwitcher from "./partials/GraphSwitcher";
import styles from "./TodayCard.module.css";

function TodayCard() {
  const { weather } = useWeather();
  const day = weather?.formatted.days[0];
  const current = day?.hours[0];
  const city = weather?.formatted.city;
  return (
    <Card color="day" loading={!weather} contentClassName={styles.root}>
      <Container>
        <div className={styles.location}>
          <Icon IconComponent={FiMenu} color="day" />
          <h1>{city || "N/A"}</h1>
          <div className={styles.fakeIcon} />
        </div>
        <div className={styles.compactable}>
          <div className={styles.temperature}>
            <h2>{current?.tempr || "N/A"}</h2>
            <h3>{current?.text || "N/A"}</h3>
          </div>
          <div className={styles.weather}>
            <div>
              <Icon IconComponent={FiUmbrella} color="day" />
              <p>{current?.precMean || "N/A"}</p>
            </div>
            <div>
              <Icon IconComponent={FiWind} color="day" />
              <p>{current?.wind || "N/A"}</p>
            </div>
            <div className={styles.compensatedContainer}>
              <Icon IconComponent={BarometerIcon} color="day" className={styles.compensatedIcon} />
              <p>{current?.pressure || "N/A"}</p>
            </div>
          </div>
        </div>
      </Container>
      <GraphSwitcher className={styles.fullWidth} />
    </Card>
  );
}

export default TodayCard;
