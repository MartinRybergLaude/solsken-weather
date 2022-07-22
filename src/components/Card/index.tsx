import { ReactNode } from "react";
import cx from "classnames";

import { Theme } from "~/types/themes";

import styles from "./Card.module.css";

interface Props {
  children: ReactNode;
  theme?: Theme | "default" | "transparent";
  className?: string;
}
function Card({ children, theme = "default", className }: Props) {
  return <div className={cx(styles.root, styles[theme], className)}>{children}</div>;
}

export default Card;
