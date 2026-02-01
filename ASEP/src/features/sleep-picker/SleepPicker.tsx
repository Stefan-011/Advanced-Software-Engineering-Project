import { Box, Stack, Grid } from "@mui/material";
import TimeTable from "../../shared/components/time-table/TimeTable";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalculateWakeUpTime from "../../shared/utils/CalculateWakeUpTime";
import { useContext, useState } from "react";
import { SettingsContext } from "../../contexts/SettingsProvider";

const SleepPicker = () => {
  const { TimeToSleep, SleepCycle, ThemeColor } = useContext(SettingsContext)!;

  const now = new Date();

  const isPmAm = false;
  const TimePickerLabel = "I want to go to bed at";

  const [time, SetTime] = useState<string>(
    isPmAm
      ? now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
  );
  const GetTimeData = () => {
    return CalculateWakeUpTime(time, isPmAm, SleepCycle, TimeToSleep);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        // bgcolor: "red",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Stack
        sx={{
          width: "100%",
          height: "100",
          my: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItem: "center",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              sx={{ color: "none" }}
              slotProps={{
                textField: {
                  sx: {
                    "& .MuiPickersSectionList-root": {
                      color: ThemeColor.textColor,
                    },
                    bgcolor: ThemeColor.lighter, // background color for whole TextField
                    // Label color
                    "& .MuiInputLabel-root": {
                      color: ThemeColor.textColor,
                      "&.Mui-focused": {
                        color: ThemeColor.textColor, // same color when focused
                      },
                    },
                    // Input text color
                    "& .MuiInputBase-input": {
                      color: "chartreuse",
                      fontWeight: "bold",
                      borderColor: "red",
                      "&.Mui-focused": {},
                    },
                    // Border colors
                    "& .MuiOutlinedInput-root": {
                      borderColor: "red",
                      "& fieldset": {
                        color: "white",
                        borderColor: "#20f704",
                      },
                      "&.Mui-focused fieldset": {
                        color: "red",
                        borderColor: "orange",
                      },
                    },
                    // Icon color
                    "& .MuiSvgIcon-root": {
                      color: ThemeColor.textColor,
                    },
                  },
                },
              }}
              label={TimePickerLabel}
              onChange={(newValue) => SetTime(newValue?.format("HH:mm") || "")}
              ampm={isPmAm}
            />
          </LocalizationProvider>
        </Grid>
        <Grid></Grid>
      </Stack>

      <Grid>
        {time != "" && (
          <TimeTable
            data={GetTimeData()}
            currentTime={time}
            isAmPm={isPmAm}
            theme={ThemeColor}
          ></TimeTable>
        )}
      </Grid>
    </Box>
  );
};

export default SleepPicker;
