/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ThemeColor } from "../../../contexts/SettingsProvider";

export const SideMenuBtn = ({
  route,
  icon,
  theme,
}: {
  route: string;
  icon: any;
  theme: ThemeColor;
}) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        border: "2px solid black",
        minHeight: 50,
        borderLeft: 0,
        borderRight: 0,
        borderTop: 0,
        pt: 1,
        // my: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: theme.textColor,
      }}
      onClick={() => {
        navigate(route);
      }}
    >
      {icon}
      {/* {label} */}
    </Box>
  );
};
