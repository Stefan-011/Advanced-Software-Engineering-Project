import { ThemeColor } from "../../contexts/SettingsProvider";

export function calculateTheme(
  hex: string = "#212121",
  shadePercent: number = 20,
): ThemeColor {
  hex = hex.replace("#", "");

  if (!/^([0-9a-fA-F]{6})$/.test(hex)) {
    throw new Error("Invalid hex color");
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  const clamp = (value: number): number => Math.max(0, Math.min(255, value));

  const toHex = (value: number): string =>
    clamp(Math.round(value)).toString(16).padStart(2, "0");

  const lighten = (percent: number): string => {
    const factor = percent / 100;
    return (
      "#" +
      toHex(r + (255 - r) * factor) +
      toHex(g + (255 - g) * factor) +
      toHex(b + (255 - b) * factor)
    );
  };

  const darken = (percent: number): string => {
    const factor = percent / 100;
    return (
      "#" +
      toHex(r * (1 - factor)) +
      toHex(g * (1 - factor)) +
      toHex(b * (1 - factor))
    );
  };

  const luminance: number = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Text color decision
  const textColor: "#000000" | "#ffffff" =
    luminance > 0.5 ? "#000000" : "#ffffff";

  return {
    original: `#${hex}`,
    lighter: lighten(shadePercent),
    darker: darken(shadePercent),
    textColor,
    isDark: luminance <= 0.5,
  };
}
