import { useEffect, useMemo, useState } from "react";
import { formatLocalTime, isDaytime } from "../utils/time";

// “public/…” files are served at the site root:
const LOCATION_URL = "/current-location.json";

export default function useCurrentLocation() {
  const [loc, setLoc] = useState(null);     // { city, province, timezone }
  const [now, setNow] = useState(() => new Date());
  const [error, setError] = useState(null);

  // Fetch once
  useEffect(() => {
    let cancelled = false;
    fetch(LOCATION_URL, { cache: "no-store" })
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(json => { if (!cancelled) setLoc(json); })
      .catch(e => { if (!cancelled) setError(e.message || "Failed to load location"); });
    return () => { cancelled = true; };
  }, []);

  // Tick the clock every minute (cheap)
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const computed = useMemo(() => {
    if (!loc) return null;
    const { timezone, city, province } = loc;
    const timeStr = formatLocalTime(now, timezone, {
      hour: "2-digit",
      minute: "2-digit"
    });
    return {
      city,
      province,
      timezone,
      timeStr,                 // "14:07"
      isDay: isDaytime(now, timezone)
    };
  }, [loc, now]);

  return { data: computed, loading: !loc && !error, error };
}
