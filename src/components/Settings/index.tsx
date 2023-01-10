import { useTranslation } from "react-i18next";

import ToggleButton from "../ToggleButton";
import styles from "./Settings.module.css";
export default function Settings() {
  const { t } = useTranslation();

  const dataSourceOptions = [
    { label: "YR.no", value: "yr" },
    { label: "SMHI", value: "smhi" },
  ];

  const temperatureOptions = [
    { label: "°C", value: "c" },
    { label: "°F", value: "f" },
  ];

  const windOptions = [
    { label: "m/s", value: "ms" },
    { label: "km/h", value: "kmh" },
    { label: "mph", value: "mph" },
    { label: "kts", value: "kts" },
    { label: "B", value: "b" },
  ];

  const precOptions = [
    { label: "mm/h", value: "mmh" },
    { label: "cm/h", value: "cmh" },
    { label: "in/h", value: "inh" },
  ];

  const pressureOptions = [
    { label: "hPa", value: "hpa" },
    { label: "bar", value: "bar" },
    { label: "at", value: "at" },
  ];

  const timeOptions = [
    { label: "24h", value: "twentyfour" },
    { label: "12h", value: "twelve" },
  ];
  return (
    <>
      <section className={styles.section}>
        <h2>{t("text_data_source")}</h2>
        <label className={styles.altLabel} htmlFor="data source">
          {t("text_data_source_desc")}
        </label>
        <ToggleButton options={dataSourceOptions} groupKey="data-src" id="data source" />
      </section>
      <section className={styles.section}>
        <h2>{t("title_units")}</h2>
        <label htmlFor="temperature">{t("grid_temperature")}</label>
        <ToggleButton options={temperatureOptions} groupKey="unit-tempr" id="temperature" />
        <label htmlFor="wind">{t("grid_wind")}</label>
        <ToggleButton options={windOptions} groupKey="unit-wind" id="wind" />
        <label htmlFor="precipitation">{t("grid_prec")}</label>
        <ToggleButton options={precOptions} groupKey="unit-prec" id="precipitation" />
        <label htmlFor="pressure">{t("grid_pressure")}</label>
        <ToggleButton options={pressureOptions} groupKey="unit-pressure" id="pressure" />
        <label htmlFor="time format">{t("grid_time_format")}</label>
        <ToggleButton options={timeOptions} groupKey="unit-time" id="time format" />
      </section>
    </>
  );
}
