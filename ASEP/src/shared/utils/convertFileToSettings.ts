import { SettingsContextType } from "../../contexts/SettingsProvider";
import { calculateTheme } from "./calculateTheme";

export const convertFileToSettings = (
  settingsFileTxt: string,
): SettingsContextType => {
  const unfilterdSettings = settingsFileTxt.replace(/\r/g, "").split("\n");
  const settings = unfilterdSettings.map((item) => {
    return item.split(":")[1];
  });
  console.log(settings[2].replace(" ", ""));
  return {
    TimeToSleep: Number(settings[0]),
    SleepCycle: Number(settings[1]),
    ThemeColor: calculateTheme(settings[2].replace(" ", "")),
  };
};
