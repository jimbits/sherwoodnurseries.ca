/**
 * hours.ts — the one source of truth for nursery hours.
 *
 * Used by the hero "Plan your visit" card (server render + client refresh),
 * HoursList / HoursDialog, and later the GardenStore JSON-LD.
 * All times are local to the nursery (America/Edmonton).
 */

export const TIME_ZONE = "America/Edmonton";

/** 24-hour "HH:MM" local times; null = closed all day. */
export type DayHours = { open: string; close: string } | null;

/** Indexed like Date#getDay(): 0 = Sunday … 6 = Saturday. */
export const weeklyHours: DayHours[] = [
  { open: "10:00", close: "17:00" }, // Sun
  { open: "09:00", close: "18:00" }, // Mon
  { open: "09:00", close: "18:00" }, // Tue
  { open: "09:00", close: "18:00" }, // Wed
  { open: "09:00", close: "20:00" }, // Thu
  { open: "09:00", close: "18:00" }, // Fri
  { open: "09:00", close: "18:00" }, // Sat
];

/**
 * Off-season closure: closed from `closes` (inclusive) until `reopens`
 * (the first day open again). ISO dates, nursery-local.
 */
export const season = { closes: "2026-10-12", reopens: "2027-03-20" };

const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** "18:00" → "6 p.m.", "09:30" → "9:30 a.m." (Canadian style). */
export function formatTime(t: string): string {
  const [h, m] = t.split(":").map(Number);
  const suffix = h < 12 ? "a.m." : "p.m.";
  const h12 = h % 12 || 12;
  return m ? `${h12}:${String(m).padStart(2, "0")} ${suffix}` : `${h12} ${suffix}`;
}

export const formatRange = (h: NonNullable<DayHours>) =>
  `${formatTime(h.open)} – ${formatTime(h.close)}`;

const dayOfWeek = (isoDate: string) =>
  new Date(`${isoDate}T12:00:00Z`).getUTCDay();

function addDays(isoDate: string, n: number): string {
  const d = new Date(`${isoDate}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/** "2027-03-20" → "Saturday, March 20" */
export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T12:00:00Z`));
}

export const isSeasonClosed = (isoDate: string) =>
  isoDate >= season.closes && isoDate < season.reopens;

export function hoursOn(isoDate: string): DayHours {
  return isSeasonClosed(isoDate) ? null : weeklyHours[dayOfWeek(isoDate)];
}

/** The nursery's local calendar date and minutes past midnight. */
function localNow(now: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)!.value;
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export type VisitStatus = {
  open: boolean;
  /** e.g. "Open today until 6 p.m." / "Closed · opens Thu 9 a.m." */
  label: string;
  /** e.g. "Sat 9 a.m. – 6 p.m." / "Reopens Saturday, March 20" */
  detail: string;
};

export function getVisitStatus(now: Date = new Date()): VisitStatus {
  const { date, minutes } = localNow(now);

  if (isSeasonClosed(date)) {
    return {
      open: false,
      label: "Closed for the season",
      detail: `Reopens ${formatDate(season.reopens)}`,
    };
  }

  const today = hoursOn(date);
  const todayDetail = (h: NonNullable<DayHours>) =>
    `${DAY_SHORT[dayOfWeek(date)]} ${formatRange(h)}`;

  if (today && minutes < toMinutes(today.open)) {
    return {
      open: false,
      label: `Closed · opens today ${formatTime(today.open)}`,
      detail: todayDetail(today),
    };
  }
  if (today && minutes < toMinutes(today.close)) {
    return {
      open: true,
      label: `Open today until ${formatTime(today.close)}`,
      detail: todayDetail(today),
    };
  }

  // Closed for the rest of today: find the next open day.
  for (let i = 1; i <= 7; i++) {
    const day = addDays(date, i);
    const h = hoursOn(day);
    if (!h) continue;
    const when = i === 1 ? "tomorrow" : DAY_SHORT[dayOfWeek(day)];
    return {
      open: false,
      label: `Closed · opens ${when} ${formatTime(h.open)}`,
      detail: `${DAY_SHORT[dayOfWeek(day)]} ${formatRange(h)}`,
    };
  }

  // Next week falls inside the off-season closure.
  return {
    open: false,
    label: today ? "Closed for the season" : "Closed today",
    detail: `Reopens ${formatDate(season.reopens)}`,
  };
}

/** Weekly hours grouped into runs of identical days, Monday first. */
export function hoursGroups(): { days: string; time: string }[] {
  const order = [1, 2, 3, 4, 5, 6, 0];
  const groups: { from: number; to: number; hours: DayHours }[] = [];
  for (const d of order) {
    const h = weeklyHours[d];
    const last = groups.at(-1);
    if (last && JSON.stringify(last.hours) === JSON.stringify(h)) last.to = d;
    else groups.push({ from: d, to: d, hours: h });
  }
  return groups.map(({ from, to, hours }) => ({
    days: from === to ? DAY_SHORT[from] : `${DAY_SHORT[from]} – ${DAY_SHORT[to]}`,
    time: hours ? formatRange(hours) : "Closed",
  }));
}
