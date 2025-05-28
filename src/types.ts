import { InputOptions } from "@actions/core";

export enum Day {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6
}

export interface ActionConfig {
  timezone: string;
}

export interface ActionInput {
  getInput: (name: string, options?: InputOptions) => string;
  setFailed: (message: string | Error) => void;
  setOutput: (name: string, value: string | boolean | number) => void;
  logInfo: (info: string) => void;
}

export interface DayInfo {
  index: Day;
  name: keyof typeof Day;
  isFriday: boolean;
}


