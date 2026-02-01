import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { SideBar } from "./features/sidebar/components/Sidebar";
import Grid from "@mui/system/Unstable_Grid";
import { SettingsContext } from "./contexts/SettingsProvider";
import { useContext } from "react";

const MainLayout = () => {
  const { ThemeColor } = useContext(SettingsContext)!;
  return (
    <Box>
      {/* HEAD */}
      {/* <Grid width={"100%"} height={30}>
        <Header></Header>
      </Grid> */}
      {/* CONTENT */}
      <Grid container sx={{ height: "100vh", width: "100vw" }}>
        <Grid xs={0.5}>
          <SideBar />
        </Grid>

        <Grid
          xs={11.5}
          sx={{ bgcolor: ThemeColor.original, overflowY: "auto" }}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
};
export default MainLayout;
