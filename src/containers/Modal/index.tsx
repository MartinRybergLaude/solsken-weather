import ReactDOM from "react-dom";

import styles from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  setOpen: (v: boolean) => void;
}
function Modal({ children, setOpen }: ModalProps) {
  function close() {
    setOpen(false);
  }

  return ReactDOM.createPortal(
    <>
      <div className={styles.shadow} onClick={close} />
      <div className={styles.modal}>{children}</div>
    </>,
    document.getElementById("modal") as Element,
  );
}

export default Modal;
