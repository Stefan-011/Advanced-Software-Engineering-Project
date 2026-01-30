import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const SideMenuBtn = ({
  label,
  route,
  icon,
}: {
  label: string;
  route: string;
  icon: any;
}) => {
  console.log(icon);
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
      }}
      onClick={() => {
        navigate(route);
      }}
    >
      {icon}
      {label}
    </Box>
  );
};
