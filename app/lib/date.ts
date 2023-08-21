/**
 * Convert the time in epoch in milliseconds to a date
 * @param epoch the epoch time
 * @returns string
 */
export const epochToDate = (epoch: number): string =>
  new Date(epoch).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
