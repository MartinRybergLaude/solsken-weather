import { ReactNode } from "react";
import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";

import Spinner from "~/components/Spinner";

import styles from "./Card.module.css";

interface Props {
  children: ReactNode;
  color?: "default" | "day" | "night" | "rain" | "dusk" | "transparent";
  className?: string;
  contentClassName?: string;
  loading?: boolean;
}
function Card({ children, color = "default", className, contentClassName, loading }: Props) {
  return (
    <div className={cx(styles.root, styles[color], className)}>
      <AnimatePresence>
        {loading && (
          <motion.div
            className={styles.spinner}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Spinner color="white" />
          </motion.div>
        )}
      </AnimatePresence>
      <div className={cx(styles.content, loading && styles.hidden, contentClassName)}>
        {children}
      </div>
    </div>
  );
}

export default Card;
