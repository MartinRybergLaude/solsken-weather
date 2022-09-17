import i18n from "~/i18n";

export function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) {
    return i18n.t("good_morning");
  } else if (hour < 18) {
    return i18n.t("good_afternoon");
  } else {
    return i18n.t("good_evening");
  }
}
