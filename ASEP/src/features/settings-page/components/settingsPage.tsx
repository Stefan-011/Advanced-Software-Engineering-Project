/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useContext, useMemo, useState } from "react";
import { SettingsContext } from "../../../contexts/SettingsProvider";

const SettingsPage = () => {
  const { SleepCycle, TimeToSleep, ThemeColor } = useContext(SettingsContext)!;
  const [localTimeToSleep, SetlocalTimeToSleep] = useState<number>(TimeToSleep);
  const [localSleepCycle, SetlocalSleepCycle] = useState<number>(SleepCycle);
  const [localThemeColor, SetlocalThemeColor] = useState<string>(
    ThemeColor.original,
  );
  const SettingsItems: Record<string, any>[] = [
    {
      name: "Sleep cycle",
      function: SetlocalSleepCycle,
      localVersion: localSleepCycle,
      placeholder: SleepCycle,
    },
    {
      name: "Time to sleep",
      function: SetlocalTimeToSleep,
      localVersion: localTimeToSleep,
      placeholder: TimeToSleep,
    },
    {
      name: "Theme color",
      function: SetlocalThemeColor,
      localVersion: localThemeColor,
      placeholder: ThemeColor.original,
    },
  ];

  const handleSubmit = async () => {
    try {
      // Build query string
      const queryParams = new URLSearchParams({
        TimeToSleep: localTimeToSleep.toString(),
        SleepCycle: localSleepCycle.toString(),
        ThemeColor: localThemeColor, // already string
      }).toString();

      const response = await fetch(
        `http://localhost:8080/writefile?${queryParams}`,
      );

      if (!response.ok) {
        throw new Error("Failed to write file");
      }
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const isChanged = useMemo(() => {
    if (SleepCycle != localSleepCycle) return true;
    if (TimeToSleep != localTimeToSleep) return true;
    if (localThemeColor != ThemeColor.original) return true;
  }, [localTimeToSleep, localSleepCycle, localThemeColor]);
  return (
    <Stack
      sx={{
        display: "flex",
        alignItems: "start",
        justifyContent: "space-evenly",
        width: "100%",
        height: "100%",
      }}
    >
      <Button
        disabled={!isChanged}
        disableRipple
        sx={{
          color: ThemeColor.textColor,
          "&:hover": {
            backgroundColor: ThemeColor.original,
            color: ThemeColor.lighter,
          },
          "&:focus": {
            border: "none",
          },
          "&.Mui-focusVisible": {
            borderColor: "#212121",
          },
        }}
        onClick={() => {
          handleSubmit();
        }}
      >
        {isChanged && "Save Changes"}
      </Button>
      {SettingsItems.map((item) => (
        <Box
          sx={{
            border: `1px solid ${ThemeColor.textColor + "55 "}`,
            borderTop: 0,
            borderLeft: 0,
            borderRight: 0,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Typography variant="h5" color={ThemeColor.textColor}>
            {item.name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {item.name == "Theme color" ? (
              <TextField
                type="color"
                label={item.name}
                onChange={(e) => item.function(e.target.value)}
                sx={{
                  mb: 2,
                  width: 300,
                  input: {
                    color: ThemeColor.textColor,
                    borderColor: ThemeColor.textColor,
                    bgcolor: ThemeColor.darker,
                  },
                  label: {
                    color: ThemeColor.textColor,
                    "&.Mui-focused": {
                      color: ThemeColor.textColor, // focused label color
                    },
                  },

                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: ThemeColor.textColor,
                    },
                    "&:hover fieldset": {
                      borderColor: ThemeColor.lighter,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: ThemeColor.textColor,
                    },
                  },
                }}
              />
            ) : (
              <TextField
                placeholder={item.placeholder}
                label={item.name}
                sx={{
                  mb: 2,
                  width: 300,
                  input: {
                    color: ThemeColor.textColor,
                    borderColor: ThemeColor.textColor,
                    bgcolor: ThemeColor.darker,
                  },
                  label: {
                    color: ThemeColor.textColor,
                    "&.Mui-focused": {
                      color: ThemeColor.textColor, // focused label color
                    },
                  },

                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: ThemeColor.textColor,
                    },
                    "&:hover fieldset": {
                      borderColor: ThemeColor.lighter,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: ThemeColor.textColor,
                    },
                  },
                }}
                onChange={(e) => item.function(e.target.value)}
              ></TextField>
            )}
          </Box>
        </Box>
      ))}
    </Stack>
  );
};

export default SettingsPage;
