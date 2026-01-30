import InfoIcon from "@mui/icons-material/Info";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
export const sideMenuConstants: Record<string, any>[] = [
  {
    name: "",
    route: "about",
    icon: <InfoIcon />,
  },
  {
    name: "Now",
    route: "now",
    icon: <AccessAlarmIcon />,
  },
  {
    name: "Wake up",
    route: "sleep-picker",
    icon: <AccessAlarmIcon />,
  },
  {
    name: "Go to bed",
    route: "wakeup",
    icon: <AccessAlarmIcon />,
  },
];
