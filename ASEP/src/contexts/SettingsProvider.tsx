/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useEffect, useState } from "react";
import { calculateTheme } from "../shared/utils/calculateTheme";
import { convertFileToSettings } from "../shared/utils/convertFileToSettings";

export type SettingsContextType = {
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
  const fetchFile = async () => {
    try {
      const data = await window.electronAPI.readFile();
      const _settings = convertFileToSettings(data.content);
      setupSettings(_settings);
    } catch (err) {
      console.error("Failed to read file via IPC:", err);
    }
  };
  useEffect(() => {
    fetchFile();
  }, []);

  const setupSettings = (_settings: SettingsContextType) => {
    SetTimeToSleep(_settings.TimeToSleep);
    SetSleepCycle(_settings.SleepCycle);
    SetThemeColor(_settings.ThemeColor);
  };

  const [TimeToSleep, SetTimeToSleep] = useState(15);
  const [SleepCycle, SetSleepCycle] = useState(90);
  const [ThemeColor, SetThemeColor] = useState<ThemeColor>(
    calculateTheme("#212121"),
  );

  return (
    <SettingsContext.Provider value={{ TimeToSleep, SleepCycle, ThemeColor }}>
      {children}
    </SettingsContext.Provider>
  );
};
