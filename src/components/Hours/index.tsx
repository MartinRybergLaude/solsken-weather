import { useMemo, useRef } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import cx from "classnames";
import Lottie from "lottie-react";

import Horizon from "~/assets/weather/horizon.json";
import Container from "~/components/Container";
import GraphSwitcher from "~/components/GraphSwitcher";
import useScrollPosition from "~/hooks/useScrollPosition";
import { Day } from "~/types/formattedWeather";

import Hour from "../Hour";
import styles from "./Hours.module.css";

interface HoursProps {
  day?: Day;
  pauseAnimation?: boolean;
}
export default function Hours({ day, pauseAnimation }: HoursProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrolled = useScrollPosition(true, scrollRef);
  const shouldDisplayShadow = useMemo(() => scrolled > 0, [scrolled]);

  return (
    <>
      <header className={cx(styles.header, shouldDisplayShadow && styles.shadow)}>
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
      <div className={styles.scrollWrapper} ref={scrollRef}>
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
