import cx from "classnames";

import styles from "./Spinner.module.css";

interface SpinnerProps {
  color?: "adaptive" | "inverse-adaptive" | "white";
}
function Spinner({ color = "adaptive" }: SpinnerProps) {
  return <span className={cx(styles.loader, styles[color])} />;
}

export default Spinner;
