import { useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import Lottie from "lottie-react";

import Horizon from "~/assets/weather/horizon.json";
import GraphSwitcher from "~/components/GraphSwitcher";
import Layout from "~/containers/Layout";
import { useWeather } from "~/contexts/WeatherContext";

import styles from "./Hours.module.css";

function Hours() {
  const { index } = useParams();
  const { weather } = useWeather();
  const navigate = useNavigate();

  // Go back to main menu if weather data is unavailable
  useEffect(() => {
    if (!weather || !index) {
      navigate("/");
    }
  }, [weather, index]);

  // Show nothing if weather data is unavailable
  if (!weather || !index) {
    return null;
  }

  const day = weather.formatted.days[Number(index)];

  return (
    <Layout flex>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <Link to="/">
            <FiArrowLeft className={styles.icon} />
          </Link>
          <div className={styles.horizon}>
            <p>{day.sunrise}</p>
            <Lottie animationData={Horizon} loop className={styles.colorIcon} />
            <p>{day.sunset}</p>
          </div>
        </div>
        <div className={styles.titleWrapper}>
          <h1>{day.dayOfWeek}</h1>
          <p>{day.dateString}</p>
        </div>
      </div>
      <div className={styles.graphWrapper}>
        <GraphSwitcher hours={day.chartHours} />
      </div>
    </Layout>
  );
}

export default Hours;
