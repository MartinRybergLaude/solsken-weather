import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import cx from "classnames";

import { useWeather } from "~/contexts/WeatherContext";

import styles from "./GraphSwitcher.module.css";
import GraphHumidity from "./partials/GraphHumidity";
import GraphPressure from "./partials/GraphPressure";
import GraphRain from "./partials/GraphRain";
import GraphTempr from "./partials/GraphTempr";
import GraphWind from "./partials/GraphWind";

interface GraphSwitcherProps {
  className?: string;
}
function GraphSwitcher({ className }: GraphSwitcherProps) {
  const { weather } = useWeather();
  const settings = {
    dots: true,
    infinite: false,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    appendDots: (dots: ReactNode) => <ul>{dots}</ul>,
    customPaging: () => <div className="customDots" />,
  };
  const { t } = useTranslation();
  return (
    <div className={cx(styles.root, className)}>
      <Slider {...settings}>
        <div className={cx(styles.card, styles.first)}>
          <h3>{t("grid_temperature")}</h3>
          <GraphTempr chartHours={weather?.formatted.chartHours} />
        </div>
        <div className={styles.card}>
          <h3>{t("grid_prec")}</h3>
          <GraphRain chartHours={weather?.formatted.chartHours} />
        </div>
        <div className={styles.card}>
          <h3>{t("grid_wind")}</h3>
          <GraphWind chartHours={weather?.formatted.chartHours} />
        </div>
        <div className={styles.card}>
          <h3>{t("grid_humidity")}</h3>
          <GraphHumidity chartHours={weather?.formatted.chartHours} />
        </div>
        <div className={cx(styles.card, styles.last)}>
          <h3>{t("grid_pressure")}</h3>
          <GraphPressure chartHours={weather?.formatted.chartHours} />
        </div>
      </Slider>
    </div>
  );
}

export default GraphSwitcher;
