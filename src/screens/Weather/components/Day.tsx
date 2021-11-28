import React from "react";
import styles from "./Day.module.scss";
import * as TypesFormattedWeather from "model/TypesFormattedWeather";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface Props extends RouteComponentProps {
  data: TypesFormattedWeather.Day;
  index: number;
}
export function Day(props: Props) {
  return (
    <div className={styles.dayContainer}>
      <p className={styles.dayName}>{props.data.dayOfWeek}</p>
      <div
        className={styles.day}
        onClick={() => props.history.push("/day/" + props.index)}
      >
        <i className={styles.icon + " wi " + props.data.icon} />
        <div className={styles.temprs}>
          <p>{props.data.tempHigh}</p>
          <p>{props.data.tempLow}</p>
        </div>
      </div>
    </div>
  );
}
export default withRouter(Day);
