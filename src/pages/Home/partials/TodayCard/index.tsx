import { FiMenu } from "react-icons/fi";
import cx from "classnames";

import Container from "~/components/Container";
import Icon from "~/components/Icon";
import LoadingWrapper from "~/components/LoadingWrapper";
import { useWeather } from "~/contexts/WeatherContext";

import GraphSwitcher from "../../../../components/GraphSwitcher";
import SmallWeatherInfo from "./partials/SmallWeatherInfo";
import styles from "./TodayCard.module.css";
function TodayCard() {
  const { weather, error } = useWeather();
  const day = weather?.formatted.days[0];
  const current = day?.hours[0];
  const city = weather?.formatted.city;
  return (
    <div className={cx(styles.root)}>
      <Container className={styles.weatherWrapper}>
        <div className={styles.location}>
          <Icon IconComponent={FiMenu} color="unset" className={styles.burger} />
          <LoadingWrapper loading={!weather} error={error}>
            <h1>{city || ""}</h1>
          </LoadingWrapper>
          <div className={styles.fakeIcon} />
        </div>
        <LoadingWrapper
          loading={!weather}
          error={error}
          contentClassName={styles.temperatureWrapper}
        >
          <div className={styles.temperature}>
            <h2>{current?.tempr || "N/A"}</h2>
            <h3>{current?.text || "N/A"}</h3>
          </div>
          <SmallWeatherInfo currentHour={current} />
        </LoadingWrapper>
        <LoadingWrapper
          loading={!weather}
          error={error}
          className={styles.weatherContainer}
          showIcons
        >
          <SmallWeatherInfo currentHour={current} />
        </LoadingWrapper>
      </Container>
      <LoadingWrapper
        loading={!weather}
        error={error}
        className={cx(styles.fullWidth, styles.graphWrapper)}
        contentClassName={cx(styles.fullWidth, styles.fullHeight)}
      >
        <GraphSwitcher hours={weather?.formatted.chartHours} />
      </LoadingWrapper>
    </div>
  );
}
export default TodayCard;
