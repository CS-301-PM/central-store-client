import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
// import ConfirmModal from "./ConfirmModal";
import DetailsModal from "./DetailsModal";
// import { Button, Stack } from "@mui/material";
import AddStocks from "../../pages/Manager/AddStocks";

interface DynamicTableProps<T extends object> {
  data?: T[];
  type?: "stocks" | "logs";
}

export default function DynamicTable<T extends object>({
  data,
  type = "logs",
}: DynamicTableProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState();

  if (!data || data.length === 0) {
    return <p className="m-3">No data available</p>;
  }

  // Take keys from first object
  const headers = Object.keys(data[0]) as (keyof T)[];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="dynamic table">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={String(header)}>{String(header)}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <>
              <TableRow
                onClick={() => {
                  setItem(row);
                  setOpen(true);
                }}
                key={rowIndex}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {headers.map((header) => (
                  <TableCell key={String(header)}>
                    {header === "created_at" || header === "updated_at"
                      ? moment(String(row[header])).fromNow()
                      : String(row[header])}
                  </TableCell>
                ))}
              </TableRow>
            </>
          ))}
        </TableBody>
        {open && type !== "logs" && (
          <DetailsModal
            open={open}
            onClose={() => setOpen(false)}
            title="Edit Stock Item"
            closeLabel="Cancel"
          >
            <AddStocks isNew={false} stockToHandle={item} />
          </DetailsModal>
        )}
      </Table>
    </TableContainer>
  );
}
