import React, { useEffect } from "react";
import styles from "./ScreenDay.module.scss";

import { RouteComponentProps, withRouter } from "react-router-dom";

import * as Consts from "utils/constants";

import { FiArrowLeft, FiBarChart } from "react-icons/fi";

import * as FormattedWeatherData from "model/TypesFormattedWeather";
import Hour from "./components/Hour";
import { WeatherData } from "model/TypesWeather";
import { getItem } from "model/utilsStorage";
import { AnimatePresence, motion } from "framer-motion";
interface Props extends RouteComponentProps<any> {
  weatherDataFormatted:
    | FormattedWeatherData.FormattedWeatherData
    | undefined
    | null;
  weatherData: WeatherData | undefined | null;
}

function ScreenDay(props: Props) {
  const dayFormatted = props.weatherDataFormatted?.days[props.match.params.id];
  const day = props.weatherData?.days[props.match.params.id];

  useEffect(() => {
    if (
      props.weatherDataFormatted?.days[props.match.params.id] == null ||
      props.weatherData?.days[props.match.params.id] == null
    ) {
      props.history.push("/");
    }
  }, [props]);

  function formatDate(): string {
    if (day == null) return "";
    const date = new Date(day.date);
    return date.getDate() + " " + Consts.Months[date.getMonth()];
  }

  return (
    <div className={"screen " + styles.containerHours}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarWrapperTitle}>
          <FiArrowLeft
            className={styles.toolbarIcon}
            onClick={() => props.history.push("/")}
          />
          <h2 className={styles.toolbarText}>{dayFormatted?.dayOfWeek}</h2>
        </div>
        <FiBarChart
          className={styles.toolbarIcon}
          onClick={() => props.history.push("/charts/" + props.match.params.id)}
        />
      </div>
      <div className={styles.containerScroll}>
        <div className={styles.containerTop}>
          <div className={styles.wrapperSun}>
            <p>{dayFormatted?.sunrise}</p>
            <i className={"wi " + Consts.WiHorizon} />
            <p>{dayFormatted?.sunset}</p>
          </div>
          <p>{formatDate()}</p>
        </div>

        {day &&
          dayFormatted?.hours.map((hour, index) => {
            return (
              <Hour
                key={index}
                hourFormatted={hour}
                hour={day.hours[index]}
                taller={
                  getItem("defaultHView") === "informative" ? true : false
                }
              />
            );
          })}
      </div>
    </div>
  );
}
export default withRouter(ScreenDay);
