import { detect } from "detect-browser";

const browser = detect();
export const showBlur = browser?.name === "safari" || browser?.name === "ios";
