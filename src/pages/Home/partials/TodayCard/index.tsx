import { FiUmbrella, FiWind } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import cx from "classnames";

import BarometerIcon from "~/assets/monochrome/barometer.svg";
import Card from "~/components/Card";
import Container from "~/components/Container";
import Icon from "~/components/Icon";

import GraphSwitcher from "./partials/GraphSwitcher";
import styles from "./TodayCard.module.css";

function TodayCard() {
  return (
    <Card color="day" contentClassName={styles.root}>
      <Container>
        <div className={styles.location}>
          <Icon IconComponent={HiOutlineLocationMarker} color="day" />
          <h1>Stockholm</h1>
        </div>
        <div className={styles.compactable}>
          <div className={styles.temperature}>
            <h2>21</h2>
            <h3>Sunny</h3>
          </div>
          <div className={styles.weather}>
            <div>
              <Icon IconComponent={FiUmbrella} color="day" />
              <p>6mm/h</p>
            </div>
            <div>
              <Icon IconComponent={FiWind} color="day" />
              <p>12m/s</p>
            </div>
            <div className={styles.compensatedContainer}>
              <Icon IconComponent={BarometerIcon} color="day" className={styles.compensatedIcon} />
              <p>1024hPa</p>
            </div>
          </div>
        </div>
      </Container>
      <GraphSwitcher className={styles.fullWidth} />
    </Card>
  );
}

export default TodayCard;
