import InfoIcon from "@mui/icons-material/Info";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import UpdateIcon from "@mui/icons-material/Update";
import RestoreIcon from "@mui/icons-material/Restore";
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
    name: "Go to bed",
    route: "sleep-picker",
    icon: <UpdateIcon />,
  },
  {
    name: "Wake up",
    route: "wakeup",
    icon: <RestoreIcon />,
  },
];
