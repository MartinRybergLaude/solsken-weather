import { useEffect, useMemo, useRef } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import cx from "classnames";
import Lottie from "lottie-react";

import Horizon from "~/assets/weather/horizon.json";
import Container from "~/components/Container";
import GraphSwitcher from "~/components/GraphSwitcher";
import Layout from "~/containers/Layout";
import { useWeather } from "~/contexts/WeatherContext";
import useScrollPosition from "~/hooks/useScrollPosition";

import styles from "./Hours.module.css";
import Hour from "./partials/Hour";

function Hours() {
  const { index } = useParams();
  const { weather } = useWeather();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrolled = useScrollPosition(true, scrollRef);

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

  const shouldDisplayShadow = useMemo(() => scrolled > 0, [scrolled]);

  return (
    <Layout flex>
      <header className={cx(styles.header, shouldDisplayShadow && styles.shadow)}>
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
      </header>
      <div className={styles.scrollWrapper} ref={scrollRef}>
        <GraphSwitcher hours={day.chartHours} />
        <Container>
          {day.hours.map(hour => (
            <Hour key={hour.hour} hour={hour} />
          ))}
          <div className={styles.padding} />
        </Container>
      </div>
    </Layout>
  );
}

export default Hours;
