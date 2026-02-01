import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import TimeTable from "../../shared/components/time-table/TimeTable";
import { useContext, useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import CalculateWakeUpTime from "../../shared/utils/CalculateWakeUpTime";
import { SettingsContext } from "../../contexts/SettingsProvider";
const SleepNow = () => {
  const { TimeToSleep, SleepCycle, ThemeColor } = useContext(SettingsContext)!;
  const now = new Date();
  const isPmAm = false;

  const [CurrentTime, SetCurrentTime] = useState<string>(
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

  const GetCurrentTime = () => {
    const local_now = new Date();
    return isPmAm
      ? local_now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : local_now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
  };

  const HandleChangeState = () => {
    SetCurrentTime(GetCurrentTime());
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Stack
        sx={{
          width: "100%",
          my: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <Typography variant="h2" ml={3} color={ThemeColor.textColor} mb={3}>
          SLEEP NOW
        </Typography>
        <Grid
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItem: "center",
          }}
        >
          <Typography variant="h2" ml={3} color={ThemeColor.textColor}>
            {CurrentTime}
          </Typography>
          <Button
            size="large"
            sx={{
              minWidth: 0,
              minHeight: 0,
              height: "fit-content",
              p: 0,
              display: "flex",
              alignItem: "center",
              justifyContent: "center",
              color: ThemeColor.textColor,
            }}
            onClick={() => HandleChangeState()}
          >
            <RefreshIcon />
          </Button>
        </Grid>
      </Stack>
      <Grid>
        <TimeTable
          data={CalculateWakeUpTime(
            CurrentTime,
            isPmAm,
            SleepCycle,
            TimeToSleep,
          )}
          currentTime={CurrentTime}
          isAmPm={isPmAm}
          theme={ThemeColor}
        ></TimeTable>
      </Grid>
    </Box>
  );
};

export default SleepNow;
