import Hours from "~/components/Hours";
import LoadingWrapper from "~/components/LoadingWrapper";
import { useWeather } from "~/contexts/WeatherContext";
import TodayCard from "~/pages/HomePage/partials/TodayCard";

import styles from "./Home.module.css";
import Days from "./partials/Days";
import { Map } from "./partials/Map";

function Home() {
  const { weather, selectedDay, loading, error } = useWeather();
  const day = weather?.formatted.days[selectedDay];
  return (
    <div className={styles.root}>
      <div className={styles.grid}>
        <div className={styles.col}>
          <TodayCard />
          <Days />
        </div>
        <LoadingWrapper loading={loading} error={error} className={styles.hours}>
          <Hours day={day} pauseAnimation={false} />
        </LoadingWrapper>
      </div>
      <div className={styles.map}>
        <Map />
      </div>
      <div className={styles.padding} />
    </div>
  );
}

export default Home;
