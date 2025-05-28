import { ActionInput, Day, DayInfo } from "./types";
import { getCurrentDate, getDayInfo, isValidTimezone } from "./utils";

export function inAction(input: ActionInput): void {
  const { getInput, logInfo, setFailed, setOutput } = input;

  try {
    const timezone = getInput("timezone") || "UTC";

    if (!isValidTimezone(timezone)) {
      setFailed(`Timezone: ${timezone} is not valid. Please provide a valid timezone.`);
      return;
    }

    const date = getCurrentDate(timezone);
    const dayInfo: DayInfo = getDayInfo(date);

    setOutput("dayIndex", dayInfo.index);
    setOutput("dayName", dayInfo.name);
    setOutput("failed", dayInfo.isFriday);

    if (dayInfo.isFriday) {
      setFailed(`Today is Friday!! No push no production day!!`);
      return;
    }

    logInfo(`Today is ${dayInfo.name}, a good day for deployment. Good Luck!`);
  } catch (error) {
    setFailed(error instanceof Error ? error.message : 'An unexpected error occurred');
  }
}
