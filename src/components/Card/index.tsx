import { ReactNode } from "react";
import cx from "classnames";

import Spinner from "~/components/Spinner";

import styles from "./Card.module.css";

interface Props {
  children: ReactNode;
  color?: "default" | "day" | "night" | "rain" | "dusk";
  className?: string;
  contentClassName?: string;
  loading?: boolean;
}
function Card({ children, color = "default", className, contentClassName, loading }: Props) {
  return (
    <div className={cx(styles.root, styles[color], className)}>
      {loading && (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      )}
      <div className={cx(styles.content, loading && styles.hidden, contentClassName)}>
        {children}
      </div>
    </div>
  );
}

export default Card;
