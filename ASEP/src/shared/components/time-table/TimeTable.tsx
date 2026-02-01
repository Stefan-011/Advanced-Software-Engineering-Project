import { DataGrid, GridColDef } from "@mui/x-data-grid";
import findTimeDifference from "../../utils/timeDifference";
import { ThemeColor } from "../../../contexts/SettingsProvider";

const TimeTable = ({
  data,
  currentTime,
  isAmPm,
  bedTime,
  theme,
}: {
  data: string[];
  currentTime: string;
  isAmPm: boolean;
  bedTime?: boolean;
  theme: ThemeColor;
}) => {
  const rows = data.map((time: string, index: number) => ({
    id: index + 1,
    Cycles: index + 1,
    WakeUp: time,
    Hours: bedTime
      ? findTimeDifference(time, currentTime, isAmPm)
      : findTimeDifference(currentTime, time, isAmPm),
  }));
  console.log(data);
  const columns: GridColDef[] = [
    {
      field: "Cycles",
      headerName: "Cycles",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Hours",
      headerName: "Hours",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "WakeUp",
      headerName: "Wake up time",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
  ];
  return (
    <>
      <DataGrid
        sx={{
          borderColor: theme.lighter,
          maxHeight: "100%",
          width: "50vw",
          overflowY: "auto",
          color: theme.textColor,
          bgcolor: theme.darker,
          "& .MuiDataGrid-virtualScroller": {
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "& .MuiDataGrid-columnHeader": {
              bgcolor: theme.lighter,
              height: 50,
            },
            "& .MuiDataGrid-row": {
              height: 10,
            },
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "transparent",
          },
        }}
        rowHeight={40}
        columns={columns}
        rows={rows}
        paginationMode="client"
        hideFooter
        disableColumnResize
      ></DataGrid>
    </>
  );
};

export default TimeTable;
