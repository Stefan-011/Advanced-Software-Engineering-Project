/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useState } from "react";
import { calculateTheme } from "../shared/utils/calculateTheme";

type SettingsContextType = {
  TimeToSleep: number;
  SleepCycle: number;
  ThemeColor: ThemeColor;
};

export type ThemeColor = {
  original: string;
  lighter: string;
  darker: string;
  textColor: "#000000" | "#ffffff";
  isDark: boolean;
};

export const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [TimeToSleep, SetTimeToSleep] = useState(15);
  const [SleepCycle, SetSleepCycle] = useState(90);
  const [ThemeColor, SetThemeColor] = useState(calculateTheme("#350256"));

  return (
    <SettingsContext.Provider value={{ TimeToSleep, SleepCycle, ThemeColor }}>
      {children}
    </SettingsContext.Provider>
  );
};
