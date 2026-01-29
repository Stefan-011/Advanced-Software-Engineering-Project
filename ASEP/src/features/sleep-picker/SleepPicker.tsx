import { Box, Stack, Grid, Button } from "@mui/material";
import TimeTable from "../../shared/components/time-table/TimeTable";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalculateWakeUpTime from "../../shared/utils/CalculateWakeUpTime";
import { useState } from "react";

const SleepPicker = () => {
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
    return CalculateWakeUpTime(time, isPmAm);
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
        py: 10,
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
              label={TimePickerLabel}
              onChange={(newValue) => SetTime(newValue?.format("HH:mm") || "")}
              ampm={isPmAm}
            />
          </LocalizationProvider>
        </Grid>
        <Grid>
          <Button
            size="large"
            variant="contained"
            sx={{ mt: 2, textAlign: "center" }}
          >
            Calculate
          </Button>
        </Grid>
      </Stack>

      <Grid>
        {time != "" && (
          <TimeTable
            data={GetTimeData()}
            currentTime={time}
            isAmPm={isPmAm}
          ></TimeTable>
        )}
      </Grid>
    </Box>
  );
};

export default SleepPicker;
