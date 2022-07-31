import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import cx from "classnames";
import useEmblaCarousel from "embla-carousel-react";

import { ChartHour } from "~/types/formattedWeather";

import styles from "./GraphSwitcher.module.css";
import GraphHumidity from "./partials/GraphHumidity";
import GraphPressure from "./partials/GraphPressure";
import GraphRain from "./partials/GraphRain";
import GraphTempr from "./partials/GraphTempr";
import GraphWind from "./partials/GraphWind";

interface GraphSwitcherProps {
  hours: ChartHour[] | undefined;
}

function GraphSwitcher({ hours }: GraphSwitcherProps) {
  const { t } = useTranslation();
  const [viewportRef, embla] = useEmblaCarousel({ skipSnaps: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollTo = useCallback((index: number) => embla && embla.scrollTo(index), [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
  }, [embla, setScrollSnaps, onSelect]);

  return (
    <>
      <div className={styles.embla}>
        <div className={styles["embla__viewport"]} ref={viewportRef}>
          <div className={styles["embla__container"]}>
            <div className={cx(styles.card, styles.first)}>
              <h3>{t("grid_temperature")}</h3>
              <GraphTempr chartHours={hours} />
            </div>
            <div className={styles.card}>
              <h3>{t("grid_prec")}</h3>
              <GraphRain chartHours={hours} />
            </div>
            <div className={styles.card}>
              <h3>{t("grid_wind")}</h3>
              <GraphWind chartHours={hours} />
            </div>
            <div className={styles.card}>
              <h3>{t("grid_humidity")}</h3>
              <GraphHumidity chartHours={hours} />
            </div>
            <div className={cx(styles.card, styles.last)}>
              <h3>{t("grid_pressure")}</h3>
              <GraphPressure chartHours={hours} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles["embla__dots"]}>
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </>
  );
}

interface DotButtonProps {
  selected: boolean;
  onClick: () => void;
}

export const DotButton = ({ selected, onClick }: DotButtonProps) => (
  <button
    className={cx(styles["embla__dot"], selected && styles["is-selected"])}
    type="button"
    onClick={onClick}
  />
);

export default GraphSwitcher;
