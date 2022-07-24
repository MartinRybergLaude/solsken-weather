import { ReactNode } from "react";
import cx from "classnames";

import styles from "./Container.module.css";
interface ContainerProps {
  children: ReactNode;
  className?: string;
}
function Container({ children, className }: ContainerProps) {
  return <div className={cx(styles.root, className)}>{children}</div>;
}

export default Container;
