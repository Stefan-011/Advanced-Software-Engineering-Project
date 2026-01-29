import { DataGrid, GridColDef } from "@mui/x-data-grid";
import findTimeDifference from "../../utils/timeDifference";

const TimeTable = ({
  data,
  currentTime,
  isAmPm,
  bedTime,
}: {
  data: string[];
  currentTime: string;
  isAmPm: boolean;
  bedTime?: boolean;
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
          maxHeight: 300,
          height: "auto",
          width: "50vw",
          overflowY: "auto",

          "& .MuiDataGrid-virtualScroller": {
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          },
        }}
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
