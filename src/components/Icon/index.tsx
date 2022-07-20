import { IconType } from "react-icons";
import styles from "./Icon.module.css";
import cx from "classnames";

interface Props {
  IconComponent: IconType | string;
  className?: string;
  color?: "unset" | "primary" | "secondary" | "day";
}
function Icon({ IconComponent, className, color = "unset" }: Props) {
  return (
    <IconComponent className={cx(styles.root, styles[color], className)} />
  );
}

export default Icon;
