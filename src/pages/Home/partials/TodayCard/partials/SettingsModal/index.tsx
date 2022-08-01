import { useTranslation } from "react-i18next";

import ToggleButton from "~/components/ToggleButton";
import Modal from "~/containers/Modal";

import styles from "./SettingsModal.module.css";

interface SettingsModalProps {
  isOpen: boolean;
  setOpen: (v: boolean) => void;
}
function SettingsModal({ isOpen, setOpen }: SettingsModalProps) {
  const { t } = useTranslation();

  if (!isOpen) {
    return null;
  }

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
    <Modal setOpen={setOpen}>
      <h1 className={styles.title}>{t("title_settings")}</h1>
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
    </Modal>
  );
}

export default SettingsModal;
