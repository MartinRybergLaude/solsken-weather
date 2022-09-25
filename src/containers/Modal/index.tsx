import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import { FiX } from "react-icons/fi";
import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";

import Icon from "~/components/Icon";
import { showBlur } from "~/utils/showBlur";

import styles from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  setOpen: (v: boolean) => void;
  isOpen: boolean;
}
function Modal({ children, setOpen, isOpen }: ModalProps) {
  const { t } = useTranslation();

  function close() {
    setOpen(false);
  }

  if (isOpen) {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100%";
  } else {
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
  }

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cx(styles.shadow, showBlur && styles.blur)}
            onClick={close}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={styles.modal}
          >
            <div className={styles.topBar}>
              <h1 className={styles.title}>{t("title_settings")}</h1>
              <Icon IconComponent={FiX} onClick={close} />
            </div>
            <div className={styles.content}>{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.getElementById("modal") as Element,
  );
}

export default Modal;
