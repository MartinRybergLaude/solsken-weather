import { useEffect, useState } from "react";
import { FiSearch, FiSettings } from "react-icons/fi";
import cx from "classnames";

import Container from "~/components/Container";
import GraphSwitcher from "~/components/GraphSwitcher";
import Icon from "~/components/Icon";
import LoadingWrapper from "~/components/LoadingWrapper";
import LocationModal from "~/components/LocationModal";
import SettingsModal from "~/components/SettingsModal";
import WeatherIcon from "~/components/WeatherIcon";
import { useWeather } from "~/contexts/WeatherContext";

import SmallWeatherInfo from "./partials/SmallWeatherInfo";
import styles from "./TodayCard.module.css";
function TodayCard() {
  const [showSettings, setShowSettings] = useState(false);
  const [showLocations, setShowLocations] = useState(false);

  const { weather, error, loading, refresh } = useWeather();

  useEffect(() => {
    if (!showSettings) {
      refresh();
    }
  }, [showSettings]);

  const day = weather?.formatted.days[0];
  const current = day?.hours[0];
  const city = weather?.formatted.city;
  return (
    <>
      <div className={cx(styles.root)}>
        <div className={styles.glass} />
        {current && <WeatherIcon id={current.icon} className={styles.dayIcon} />}
        <Container className={styles.weatherWrapper}>
          <div className={styles.location}>
            <Icon
              IconComponent={FiSettings}
              color="primary"
              className={styles.burger}
              onClick={() => setShowSettings(prev => !prev)}
            />
            <LoadingWrapper loading={loading} error={error}>
              <h1>{city || ""}</h1>
            </LoadingWrapper>
            <Icon
              IconComponent={FiSearch}
              color="primary"
              className={styles.burger}
              onClick={() => setShowLocations(prev => !prev)}
            />
          </div>
          <LoadingWrapper
            loading={loading}
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
            loading={loading}
            error={error}
            className={styles.weatherContainer}
            showIcons
          >
            <SmallWeatherInfo currentHour={current} />
          </LoadingWrapper>
        </Container>
        <LoadingWrapper
          loading={loading}
          error={error}
          className={cx(styles.fullWidth, styles.graphWrapper)}
          contentClassName={cx(styles.fullWidth, styles.fullHeight)}
        >
          <GraphSwitcher hours={weather?.formatted.chartHours} />
        </LoadingWrapper>
      </div>
      <SettingsModal isOpen={showSettings} setOpen={setShowSettings} />
      <LocationModal isOpen={showLocations} setOpen={setShowLocations} />
    </>
  );
}
export default TodayCard;
