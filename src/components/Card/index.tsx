import { ReactNode } from "react";
import styles from "./Card.module.css";
import cx from "classnames";
import Spinner from "~/components/Spinner";

interface Props {
  children: ReactNode;
  color?: "default" | "day" | "night" | "rain" | "dusk";
  className?: string;
  contentClassName?: string;
  loading?: boolean;
}
function Card({
  children,
  color = "default",
  className,
  contentClassName,
  loading,
}: Props) {
  return (
    <div className={cx(styles.root, styles[color], className)}>
      {loading && (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      )}
      <div
        className={cx(
          styles.content,
          loading && styles.hidden,
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default Card;
