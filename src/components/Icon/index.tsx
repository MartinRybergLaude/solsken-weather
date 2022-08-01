import { IconType } from "react-icons";
import cx from "classnames";

import { SVGIcon } from "~/types/icon";

import styles from "./Icon.module.css";

interface Props {
  IconComponent: IconType | SVGIcon;
  className?: string;
  color?: "unset" | "primary" | "secondary";
}
function Icon({ IconComponent, className, color = "primary" }: Props) {
  return <IconComponent className={cx(styles.root, styles[color], className)} />;
}

export default Icon;
