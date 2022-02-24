import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Data from "./data/data.json";

export default function DenseTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {Data.map((item) => {
              return (
                <>
                  <TableCell align="center">{item.title}</TableCell>
                </>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {Data.map((item) => {
            return (
              <>
                <TableCell align="center">{item.content}</TableCell>
              </>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
