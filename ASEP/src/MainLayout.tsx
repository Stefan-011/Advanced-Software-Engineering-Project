import { Outlet, useNavigate } from "react-router-dom";
import { RouterConstants } from "./router/RoutesConstants";
import { Box, Button, Grid, Typography } from "@mui/material";

const MainLayout = () => {
  const navigate = useNavigate();
  // navigate(RouterConstants.AboutPage);
  // navigate("test-page");
  console.log("mainlayou");
  return (
    <Box>
      <Button
        onClick={() => {
          navigate(RouterConstants.AboutPage);
        }}
      >
        ROute
      </Button>
      {/* HEAD */}
      <Grid>
        <Grid></Grid>
      </Grid>
      {/* CONTENT */}
      <Grid
        sx={{ bgcolor: "red", height: "100vh", width: "100vw" }}
        flexDirection={"row"}
      >
        <Grid></Grid>
        <Outlet />
      </Grid>
    </Box>
  );
};
export default MainLayout;
