import tzLookup from "tz-lookup";

const browserTimezone = (): string => Intl.DateTimeFormat().resolvedOptions().timeZone;

export function getTimezoneForCoords(lat: number, lon: number): string {
  try {
    return tzLookup(lat, lon);
  } catch {
    return browserTimezone();
  }
}

export function validateTimezone(tz: string): boolean {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

function partsFor(date: Date, options: Intl.DateTimeFormatOptions): Intl.DateTimeFormatPart[] {
  return new Intl.DateTimeFormat("en-US", options).formatToParts(date);
}

function partValue(parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes): string {
  return parts.find(p => p.type === type)?.value ?? "";
}

export function getHourInTimezone(date: Date, timeZone: string): number {
  const parts = partsFor(date, { timeZone, hour: "2-digit", hourCycle: "h23" });
  return parseInt(partValue(parts, "hour"), 10);
}

export function getYMDInTimezone(date: Date, timeZone: string): string {
  const parts = partsFor(date, {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return `${partValue(parts, "year")}-${partValue(parts, "month")}-${partValue(parts, "day")}`;
}

export function getDayOfWeekInTimezone(date: Date, timeZone: string): number {
  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  const parts = partsFor(date, { timeZone, weekday: "short" });
  return weekdayMap[partValue(parts, "weekday")] ?? 0;
}

export function getDayInTimezone(date: Date, timeZone: string): number {
  const parts = partsFor(date, { timeZone, day: "numeric" });
  return parseInt(partValue(parts, "day"), 10);
}

export function getMonthIndexInTimezone(date: Date, timeZone: string): number {
  const parts = partsFor(date, { timeZone, month: "numeric" });
  return parseInt(partValue(parts, "month"), 10) - 1;
}

export function isSameDayInTimezone(d1: Date, d2: Date, timeZone: string): boolean {
  return getYMDInTimezone(d1, timeZone) === getYMDInTimezone(d2, timeZone);
}

function getTimezoneOffsetMs(date: Date, timeZone: string): number {
  const parts = partsFor(date, {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  const asUTC = Date.UTC(
    parseInt(partValue(parts, "year"), 10),
    parseInt(partValue(parts, "month"), 10) - 1,
    parseInt(partValue(parts, "day"), 10),
    parseInt(partValue(parts, "hour"), 10),
    parseInt(partValue(parts, "minute"), 10),
    parseInt(partValue(parts, "second"), 10),
  );
  return asUTC - date.getTime();
}

/**
 * Returns the instant that is 12:00 local time on the calendar day that `date`
 * falls on in `timeZone`. Use this as the input to SunCalc.getTimes so it
 * resolves the correct solar day: SunCalc rounds to the *nearest* solar noon,
 * so feeding it e.g. 00:00 local (22:00 UTC the previous day) picks the
 * previous day's sunrise/sunset.
 */
export function getNoonInTimezone(date: Date, timeZone: string): Date {
  const [year, month, day] = getYMDInTimezone(date, timeZone).split("-").map(Number);
  const utcNoon = Date.UTC(year, month - 1, day, 12);
  const offset = getTimezoneOffsetMs(new Date(utcNoon), timeZone);
  return new Date(utcNoon - offset);
}
