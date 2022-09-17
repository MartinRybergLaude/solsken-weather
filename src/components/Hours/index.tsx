import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import cx from "classnames";
import Lottie from "lottie-react";

import Horizon from "~/assets/weather/horizon.json";
import Container from "~/components/Container";
import GraphSwitcher from "~/components/GraphSwitcher";
import { Day } from "~/types/formattedWeather";

import Hour from "../Hour";
import styles from "./Hours.module.css";

interface HoursProps {
  day?: Day;
  pauseAnimation?: boolean;
}
export default function Hours({ day, pauseAnimation }: HoursProps) {
  return (
    <>
      <header className={cx(styles.header)}>
        <div className={styles.headerTop}>
          <Link to="/">
            <FiArrowLeft className={styles.icon} />
          </Link>
          <div className={styles.horizon}>
            <p>{day?.sunrise}</p>
            <Lottie animationData={Horizon} loop className={styles.colorIcon} />
            <p>{day?.sunset}</p>
          </div>
        </div>
        <div className={styles.titleWrapper}>
          <h1>{day?.dayOfWeek}</h1>
          <p>{day?.dateString}</p>
        </div>
      </header>
      <div className={styles.scrollWrapper}>
        <GraphSwitcher hours={day?.chartHours} />
        <Container className={styles.hoursWrapper}>
          {day?.hours.map(hour => (
            <Hour key={hour.hour} hour={hour} pauseAnimation={pauseAnimation} />
          ))}
          <div className={styles.padding} />
        </Container>
      </div>
    </>
  );
}
