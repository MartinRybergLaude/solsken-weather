import React from "react";
import { MdErrorOutline } from "react-icons/md";
import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";

import Icon from "~/components/Icon";
import Spinner from "~/components/Spinner";

import styles from "./LoadingWrapper.module.css";
interface LoadingWrapperProps {
  loading?: boolean;
  error?: string;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
  showIcons?: boolean;
}

function LoadingWrapper({
  loading = false,
  error,
  showIcons = false,
  className,
  contentClassName,
  children,
}: LoadingWrapperProps) {
  return (
    <div className={className}>
      {showIcons && (
        <AnimatePresence>
          {error ? (
            <motion.div
              className={styles.wrapper}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Icon IconComponent={MdErrorOutline} />
            </motion.div>
          ) : (
            loading && (
              <motion.div
                className={styles.wrapper}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Spinner color="adaptive" />
              </motion.div>
            )
          )}
        </AnimatePresence>
      )}
      <div className={cx(styles.content, (loading || error) && styles.hidden, contentClassName)}>
        {children}
      </div>
    </div>
  );
}

export default LoadingWrapper;
