export function formatLocalTime(date, timeZone, opts = {}) {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    hour12: false,
    ...opts
  });
  return fmt.format(date);
}

// Define your own day window; tweak to taste.
export function isDaytime(date, timeZone) {
  const hour = Number(
    formatLocalTime(date, timeZone, { hour: "2-digit" })
  );
  // Example: day = 7:00–19:59
  return hour >= 7 && hour < 20;
}
