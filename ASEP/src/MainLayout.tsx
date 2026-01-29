import { Outlet, useNavigate } from "react-router-dom";
import { RouterConstants } from "./router/RoutesConstants";
import { Box, Button, Typography } from "@mui/material";
import { SideBar } from "./features/sidebar/components/Sidebar";
import Grid from "@mui/system/Unstable_Grid";
import Header from "./features/header/Header";

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
      <Grid width={"100%"} height={30}>
        <Header></Header>
      </Grid>
      {/* CONTENT */}
      <Grid container sx={{ bgcolor: "red", height: "100vh", width: "98vw" }}>
        <Grid xs={1}>
          <SideBar />
        </Grid>

        <Grid xs={11} sx={{ bgcolor: "#353539ff" }}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
};
export default MainLayout;
