export function calcFeelsLike(tempr: number, humidity: number, wind: number): number {
  if (tempr >= 27 && humidity >= 40) {
    const tF = Math.round(1.8 * tempr + 32);
    const feelsLikeDewF =
      -42.379 +
      2.04901523 * tF +
      10.14333127 * humidity -
      0.22475541 * tF * humidity -
      6.83783 * Math.pow(10, -3) * tF * tF -
      5.481717 * Math.pow(10, -2) * humidity * humidity +
      1.22874 * Math.pow(10, -3) * tF * tF * humidity +
      8.5282 * Math.pow(10, -4) * tF * humidity * humidity -
      1.99 * Math.pow(10, -6) * tF * tF * humidity * humidity;
    const feelsLikeDewC = Math.round((feelsLikeDewF - 32) / 1.8);
    return feelsLikeDewC;
  } else if (tempr <= 10 && wind >= 1.34) {
    const wKM = wind * 3.6;
    const feelsLikeWindC = Math.round(
      13.12 + 0.6215 * tempr - 11.37 * Math.pow(wKM, 0.16) + 0.3965 * tempr * Math.pow(wKM, 0.16),
    );
    return feelsLikeWindC;
  } else {
    return tempr;
  }
}
export function isSameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}
