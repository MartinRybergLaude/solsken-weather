import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

import styles from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  setOpen: (v: boolean) => void;
  isOpen: boolean;
}
function Modal({ children, setOpen, isOpen }: ModalProps) {
  function close() {
    setOpen(false);
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
            className={styles.shadow}
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

export default Modal;
