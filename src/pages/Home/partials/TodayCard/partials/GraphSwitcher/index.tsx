import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import cx from "classnames";

import Card from "~/components/Card";
import Container from "~/components/Container";
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
    speed: 500,
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
        <Card className={cx(styles.card, styles.first)}>
          <Container className={styles.container}>
            <h3>{t("grid_temperature")}</h3>
            <GraphTempr chartHours={weather?.formatted.chartHours} />
          </Container>
        </Card>
        <Card className={styles.card}>
          <Container className={styles.container}>
            <h3>{t("grid_prec")}</h3>
            <GraphRain chartHours={weather?.formatted.chartHours} />
          </Container>
        </Card>
        <Card className={cx(styles.card, styles.last)}>
          <Container className={styles.container}>
            <h3>{t("grid_wind")}</h3>
            <GraphWind chartHours={weather?.formatted.chartHours} />
          </Container>
        </Card>
        <Card className={cx(styles.card, styles.last)}>
          <Container className={styles.container}>
            <h3>{t("grid_humidity")}</h3>
            <GraphHumidity chartHours={weather?.formatted.chartHours} />
          </Container>
        </Card>
        <Card className={cx(styles.card, styles.last)}>
          <Container className={styles.container}>
            <h3>{t("grid_pressure")}</h3>
            <GraphPressure chartHours={weather?.formatted.chartHours} />
          </Container>
        </Card>
      </Slider>
    </div>
  );
}

export default GraphSwitcher;
