import { useEffect } from "react";
import ReactDOM from "react-dom";
import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";

import { showBlur } from "~/utils/showBlur";

import styles from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  setOpen: (v: boolean) => void;
  isOpen: boolean;
  title?: string;
  closeCB?: () => void;
}
function Modal({ children, setOpen, isOpen, closeCB }: ModalProps) {
  function close() {
    if (closeCB) {
      closeCB();
    } else {
      setOpen(false);
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    }
  }, [isOpen]);

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
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.getElementById("modal") as Element,
  );
}

export function PaddedModal(props: ModalProps) {
  return (
    <Modal {...props}>
      <div className={styles.padded}>{props.children}</div>
    </Modal>
  );
}

export default Modal;
