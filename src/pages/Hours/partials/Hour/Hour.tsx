import { useState } from "react";
import { motion } from "framer-motion";

import { Hour as FormattedHour } from "~/types/formattedWeather";

import styles from "./Hour.module.css";

interface HourProps {
  hour: FormattedHour;
}
export default function Hour({ hour }: HourProps) {
  const variants = {
    open: { height: 152 },
    closed: { height: 72 },
  };

  const [isExpandedVis, setExpandedVis] = useState(false);
  const [isMountedVis, setMountedVis] = useState(false);

  function setExpanded() {
    if (isExpandedVis) {
      setExpandedVis(false);
      setTimeout(() => setMountedVis(false), 200);
    } else {
      setExpandedVis(true);
      setMountedVis(true);
    }
  }

  return (
    <motion.div
      className={styles.hour}
      onClick={() => setExpanded()}
      animate={isExpandedVis ? "open" : "closed"}
      variants={variants}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 31,
      }}
      initial={false}
    >
      <div className={styles.preview}></div>
      {isMountedVis && <div className={styles.containerExpanded}></div>}
    </motion.div>
  );
}
