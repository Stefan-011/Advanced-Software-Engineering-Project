import { Stack } from "@mui/material";
import { SideMenuBtn } from "../../../shared/components/sidemenu-btn/SideMenuBtn";
import { RouterConstants } from "../../../router/RoutesConstants";
import { sideMenuConstants } from "../../../shared/utils/sidemenuConstants";

interface sidebarData {
  name: string;
  route: string;
}

export const SideBar = () => {
  return (
    <Stack
      height={"100vh"}
      width={"100%"}
      bgcolor={"brown"}
      display={"flex"}
      flexDirection={"column"}
      alignContent={"center"}
      justifyContent={"space-between"}
    >
      <Stack
        display={"flex"}
        flexDirection={"column"}
        alignContent={"center"}
        bgcolor={"green"}
        height={"90%"}
      >
        {sideMenuConstants.map((menu) => {
          return (
            <SideMenuBtn
              label={menu.name}
              route={menu.route}
              icon={menu.icon}
            ></SideMenuBtn>
          );
        })}
      </Stack>
      {/* <Stack height={"10%"} justifyContent={"end"}>
        <SideMenuBtn label="OPT3" route="/"></SideMenuBtn>
      </Stack> */}
    </Stack>
  );
};
