// global.d.ts
export {};

declare global {
  interface Window {
    electronAPI: {
      readFile: () => Promise<{ content: string; error?: string }>;
      writeFile: (data: {
        TimeToSleep: number | string;
        SleepCycle: number | string;
        ThemeColor: string;
      }) => Promise<{ message?: string; error?: string }>;
    };
  }
}
