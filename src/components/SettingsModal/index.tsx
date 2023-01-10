import { useTranslation } from "react-i18next";
import { FiX } from "react-icons/fi";

import { PaddedModal } from "~/containers/Modal";

import Icon from "../Icon";
import Settings from "../Settings";
import styles from "./SettingsModal.module.css";

interface SettingsModalProps {
  isOpen: boolean;
  setOpen: (v: boolean) => void;
}
function SettingsModal({ isOpen, setOpen }: SettingsModalProps) {
  const { t } = useTranslation();
  return (
    <PaddedModal setOpen={setOpen} isOpen={isOpen}>
      <div className={styles.topBar}>
        <h1 className={styles.title}>{t("title_settings")}</h1>
        <Icon IconComponent={FiX} onClick={() => setOpen(false)} />
      </div>
      <div className={styles.content}>
        <Settings />
      </div>
    </PaddedModal>
  );
}

export default SettingsModal;
