import { Button } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import CloseIcon from "@mui/icons-material/Close";
import MinimizeIcon from "@mui/icons-material/Minimize";
import CropSquareIcon from "@mui/icons-material/CropSquare";

const Header = () => {
  const headerButtons: Record<string, any>[] = [
    {
      name: "minimize",
      icon: <MinimizeIcon />,
    },
    {
      name: "maximize",
      icon: <CropSquareIcon />,
    },
    {
      name: "exit",
      icon: <CloseIcon />,
    },
  ];

  return (
    <>
      <Grid
        sx={{ width: "100%", height: "100%", bgcolor: "gray" }}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"end"}
      >
        {headerButtons.map((button) => {
          return <Button sx={{ color: "black" }}>{button.icon}</Button>;
        })}
      </Grid>
    </>
  );
};

export default Header;
