import { FiUmbrella, FiWind } from "react-icons/fi";

import BarometerIcon from "~/assets/monochrome/barometer.svg?react";
import Icon from "~/components/Icon";
import { Hour } from "~/types/formattedWeather";

import styles from "./SmallWeatherInfo.module.css";

interface SmallWeatherInfoProps {
  currentHour?: Hour;
}

function SmallWeatherInfo({ currentHour }: SmallWeatherInfoProps) {
  return (
    <div className={styles.compactable}>
      <div className={styles.weather}>
        <div>
          <Icon IconComponent={FiUmbrella} color="unset" />
          <p>{currentHour?.precMean || "N/A"}</p>
        </div>
        <div>
          <Icon IconComponent={FiWind} color="unset" />
          <p>{currentHour?.wind || "N/A"}</p>
        </div>
        <div className={styles.compensatedContainer}>
          <Icon IconComponent={BarometerIcon} color="unset" className={styles.compensatedIcon} />
          <p>{currentHour?.pressure || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

export default SmallWeatherInfo;
