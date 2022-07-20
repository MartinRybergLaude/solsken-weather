import Card from "~/components/Card";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Icon from "~/components/Icon";
import { FiUmbrella, FiWind } from "react-icons/fi";
import BarometerIcon from "~/assets/monochrome/barometer.svg";
import styles from "./TodayCard.module.css";
import cx from "classnames";
import GraphSwitcher from "./partials/GraphSwitcher";
import Container from "~/components/Container";

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
              <Icon
                IconComponent={BarometerIcon}
                color="day"
                className={styles.compensatedIcon}
              />
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
