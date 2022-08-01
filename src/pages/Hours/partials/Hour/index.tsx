import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiArrowDown, FiUmbrella } from "react-icons/fi";
import { MdWaterDrop } from "react-icons/md";
import cx from "classnames";
import { motion } from "framer-motion";

import { ReactComponent as BarometerSVG } from "assets/monochrome/barometer.svg";
import { ReactComponent as WindSVG } from "assets/monochrome/wind.svg";

import Icon from "~/components/Icon";
import WeatherIcon from "~/components/WeatherIcon";
import { Hour as FormattedHour } from "~/types/formattedWeather";

import styles from "./Hour.module.css";

interface HourProps {
  hour: FormattedHour;
}
export default function Hour({ hour }: HourProps) {
  const { t } = useTranslation();

  const variants = {
    open: { height: 152 },
    closed: { height: 72 },
  };

  const [isExpandedVis, setExpandedVis] = useState(false);
  const [isMountedVis, setMountedVis] = useState(false);

  function setExpanded() {
    if (isExpandedVis) {
      setExpandedVis(false);
      setTimeout(() => setMountedVis(false), 200);
    } else {
      setExpandedVis(true);
      setMountedVis(true);
    }
  }

  return (
    <motion.div
      className={styles.hour}
      onClick={() => setExpanded()}
      animate={isExpandedVis ? "open" : "closed"}
      variants={variants}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 31,
      }}
      initial={false}
    >
      <div className={styles.preview}>
        <div className={styles.left}>
          <p className={styles.hourText}>{hour.hour}</p>
          <div className={styles.temps}>
            <p>{hour.tempr}</p>
            <p>{hour.feelslike}</p>
          </div>
        </div>
        <WeatherIcon id={hour.icon} className={styles.weatherIconWrapper} />
        <div>
          <p className={styles.strong}>{hour.precMean.split(" ")[0]}</p>
          <p>{hour.precMean.split(" ")[1]}</p>
        </div>
        <div className={styles.wind}>
          <div>
            <p className={styles.strong}>{hour.wind.split(" ")[0]}</p>
            <p>{hour.wind.split(" ")[1]}</p>
          </div>
          <FiArrowDown
            style={{ transform: `rotate(${hour.windDirDeg}deg)` }}
            className={styles.windArrow}
          />
        </div>
      </div>
      {isMountedVis && (
        <div className={styles.containerExpanded}>
          <div className={styles.infoBox}>
            <div className={styles.iconWrapper}>
              <Icon IconComponent={MdWaterDrop} className={styles.icon} />
            </div>
            <p>{hour.humidity}</p>
          </div>
          <div className={styles.infoBox}>
            <div className={styles.iconWrapper}>
              <Icon IconComponent={BarometerSVG} className={cx(styles.icon, styles.adjusted)} />
            </div>
            <p>{hour.pressure}</p>
          </div>
          <div className={styles.infoBox}>
            <div className={cx(styles.iconWrapper, styles.max)}>
              <Icon IconComponent={FiUmbrella} className={styles.icon} />
              <p>MAX</p>
            </div>
            <p>{hour.precMean}</p>
          </div>
          <div className={styles.infoBox}>
            <div className={cx(styles.iconWrapper, styles.max)}>
              <Icon IconComponent={WindSVG} className={cx(styles.icon, styles.adjusted)} />
              <p>MAX</p>
            </div>
            <p>{hour.gusts}</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
