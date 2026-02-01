import { Stack } from "@mui/material";
import { SideMenuBtn } from "../../../shared/components/sidemenu-btn/SideMenuBtn";

import { sideMenuConstants } from "../../../shared/utils/sidemenuConstants";
import { SettingsContext } from "../../../contexts/SettingsProvider";
import { useContext } from "react";

export const SideBar = () => {
  const { ThemeColor } = useContext(SettingsContext)!;
  return (
    <Stack
      height={"100%"}
      width={"100%"}
      bgcolor={ThemeColor.darker}
      display={"flex"}
      flexDirection={"column"}
      alignContent={"center"}
      justifyContent={"space-between"}
    >
      <Stack
        display={"flex"}
        flexDirection={"column"}
        alignContent={"center"}
        height={"90%"}
      >
        {sideMenuConstants.map((menu) => {
          return (
            <SideMenuBtn
              route={menu.route}
              icon={menu.icon}
              theme={ThemeColor}
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
