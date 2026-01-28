import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const SideMenuBtn = ({
  label,
  route,
}: {
  label: string;
  route: string;
}) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{ bgcolor: "blue" }}
      onClick={() => {
        alert("navigacija");
        navigate(route);
      }}
    >
      {label}
    </Box>
  );
};
