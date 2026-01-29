import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import TimeTable from "../../shared/components/time-table/TimeTable";
import { useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import CalculateWakeUpTime from "../../shared/utils/CalculateWakeUpTime";
const SleepNow = () => {
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
    return isPmAm
      ? now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
  };

  const HandleChangeState = () => {
    SetCurrentTime(GetCurrentTime);
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
          <Typography variant="h2" ml={3}>
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
            }}
            onClick={HandleChangeState}
          >
            <RefreshIcon />
          </Button>
        </Grid>
      </Stack>
      <Grid>
        <TimeTable
          data={CalculateWakeUpTime(CurrentTime, isPmAm)}
          currentTime={CurrentTime}
          isAmPm={isPmAm}
        ></TimeTable>
      </Grid>
    </Box>
  );
};

export default SleepNow;
