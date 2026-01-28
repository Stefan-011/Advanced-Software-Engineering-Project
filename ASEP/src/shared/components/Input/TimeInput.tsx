import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// import { InputProp } from "../types/InputProp";

export const TimeInput = () => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker label="Basic time picker" ampm={false} />
      </LocalizationProvider>
    </>
  );
};
