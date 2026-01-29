import { Stack } from "@mui/material";
import { SideMenuBtn } from "../../../shared/components/sidemenu-btn/SideMenuBtn";

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
        <SideMenuBtn label="OPT1" route="/"></SideMenuBtn>
        <SideMenuBtn label="OPT2" route="/"></SideMenuBtn>
      </Stack>
      <Stack height={"10%"} justifyContent={"end"}>
        <SideMenuBtn label="OPT3" route="/"></SideMenuBtn>
      </Stack>
    </Stack>
  );
};
