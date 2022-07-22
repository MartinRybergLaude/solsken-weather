import { ReactNode } from "react";
import cx from "classnames";

import styles from "./Card.module.css";

interface Props {
  children: ReactNode;
  color?: "default" | "day" | "night" | "rain" | "dusk" | "transparent";
  className?: string;
}
function Card({ children, color = "default", className }: Props) {
  return <div className={cx(styles.root, styles[color], className)}>{children}</div>;
}

export default Card;
