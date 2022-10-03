import { IconType } from "react-icons";
import cx from "classnames";

import { SVGIcon } from "~/types/icon";

import styles from "./Icon.module.css";

interface Props {
  IconComponent: IconType | SVGIcon;
  className?: string;
  color?: "unset" | "primary" | "secondary";
  onClick?: () => void;
}
function Icon({ IconComponent, className, color = "primary", onClick }: Props) {
  if (onClick) {
    return (
      <button className={styles.button} onClick={onClick}>
        <IconComponent className={cx(styles.root, styles[color], className)} />
      </button>
    );
  }
  return <IconComponent className={cx(styles.root, styles[color], className)} />;
}

export default Icon;
