import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export type Column<T> = {
  key: keyof T;
  label: string;
  align?: "left" | "right" | "center";
  render?: (value: any, row: T) => React.ReactNode;
};

type ReusableTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  getRowStyle?: (row: T, index: number) => React.CSSProperties;
};

export function ReusableTable<T extends { id: string | number }>({
  columns,
  data,
  getRowStyle,
}: ReusableTableProps<T>) {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            {columns.map((col) => (
              <TableCell key={String(col.key)} align={col.align || "left"}>
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow
              key={row.id}
              sx={getRowStyle ? getRowStyle(row, rowIndex) : {}}
            >
              {columns.map((col) => (
                <TableCell key={String(col.key)} align={col.align || "left"}>
                  {col.render
                    ? col.render((row as any)[col.key], row)
                    : (row as any)[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
