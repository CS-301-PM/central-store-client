import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface DynamicTableProps<T extends object> {
  data: T[];
}

export default function DynamicTable<T extends object>({
  data,
}: DynamicTableProps<T>) {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
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
            <TableRow
              key={rowIndex}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {headers.map((header) => (
                <TableCell key={String(header)}>
                  {String(row[header])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
