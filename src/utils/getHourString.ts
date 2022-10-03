import { timeUnits } from "./constants";

export function getHourString(unitTime: timeUnits, date: Date): string {
  const minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

  switch (unitTime) {
    case "twentyfour": {
      const hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
      return hours + ":" + minutes;
    }
    case "twelve": {
      let hours = date.getHours();
      const ampm = hours >= 12 ? " pm" : " am";
      hours = hours % 12;
      hours = hours ? hours : 12;
      return hours + "." + minutes + ampm;
    }
    default: {
      const hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
      return hours + ":" + minutes;
    }
  }
}
