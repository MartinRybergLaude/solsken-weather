import { timeUnits } from "./constants";

function partsFor(date: Date, options: Intl.DateTimeFormatOptions): Intl.DateTimeFormatPart[] {
  return new Intl.DateTimeFormat("en-US", options).formatToParts(date);
}

function partValue(parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes): string {
  return parts.find(p => p.type === type)?.value ?? "";
}

export function getHourString(unitTime: timeUnits, date: Date, timeZone: string): string {
  switch (unitTime) {
    case "twelve": {
      const parts = partsFor(date, {
        timeZone,
        hour: "numeric",
        minute: "2-digit",
        hourCycle: "h12",
      });
      const hours = partValue(parts, "hour");
      const minutes = partValue(parts, "minute");
      const dayPeriod = partValue(parts, "dayPeriod").toLowerCase();
      return `${hours}.${minutes} ${dayPeriod}`;
    }
    case "twentyfour":
    default: {
      const parts = partsFor(date, {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      });
      const hours = partValue(parts, "hour");
      const minutes = partValue(parts, "minute");
      return `${hours}:${minutes}`;
    }
  }
}
