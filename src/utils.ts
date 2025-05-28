import { Day, DayInfo } from './types'

export function getCurrentDate(timezone: string): Date {
  try {
    const dateString = new Date().toLocaleString("en-US", { timeZone: timezone });
    return new Date(dateString);
  } catch (error) {
    throw new Error(`Invalid timezone: ${timezone}`);
  }
}

export function isValidTimezone(timezone: string): boolean {
  try {
    getCurrentDate(timezone);
    return true;
  } catch {
    return false;
  }
}

export function getDayInfo(date: Date): DayInfo {
  const dayIndex = date.getDay();
  const dayName = Day[dayIndex] as keyof typeof Day;
  return {
    index: dayIndex,
    name: dayName,
    isFriday: dayIndex === Day.Friday
  };
}
