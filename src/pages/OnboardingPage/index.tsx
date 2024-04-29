import { useTranslation } from "react-i18next";
import { motion, useAnimationControls } from "framer-motion";

import LogoSVG from "assets/logo.svg?react";

import Icon from "~/components/Icon";
import Settings from "~/components/Settings";

import styles from "./Onboarding.module.css";

interface OnboardingProps {
  onComplete: () => void;
}
export default function Onboarding({ onComplete }: OnboardingProps) {
  const { t } = useTranslation();
  const controls = useAnimationControls();

  async function startExitAnim() {
    await controls.start({
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3, ease: "easeInOut" },
    });
    onComplete();
  }
  return (
    <motion.div animate={controls} className={styles.root}>
      <motion.div
        initial={{ opacity: 0, top: 32 }}
        animate={{ opacity: 1, top: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={styles.welcome}
      >
        <Icon IconComponent={LogoSVG} className={styles.logo} />
        <h1>{t("text_welcome")}!</h1>
        <p>{t("text_enter_settings")}</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
        className={styles.settings}
      >
        <Settings />
      </motion.div>
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
        onClick={() => startExitAnim()}
      >
        {t("text_done")}
      </motion.button>
      <motion.p
        initial={{ opacity: 0, top: 32 }}
        animate={{ opacity: 1, top: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={styles.attribution}
      >
        Made with ❤️ by <a href="https://mrlaude.com">mrlaude</a>
      </motion.p>
    </motion.div>
  );
}
