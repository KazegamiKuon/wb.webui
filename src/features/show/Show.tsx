import {
  Alert,
  Box,
  CircularProgress,
  Grid,
  Snackbar,
  TableFooter,
  TablePagination,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import billApi from "api/billApi";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { TablePaginationActions } from "components/TablePaginationActions";
import React, { useEffect, useState } from "react";
import { billSelector, showActions, showLoadingSelector } from "./showSlice";

export function Show() {
  const dispatch = useAppDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openAlert, setOpenAlert] = useState(false);
  // selector
  const bills = useAppSelector(billSelector);
  const isLoading = useAppSelector(showLoadingSelector);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bills.length) : 0;

  useEffect(() => {
    dispatch(showActions.setShowIsLoading());
    billApi.getAll().then((response) => {
      if (response.data.isError) {
      } else {
        dispatch(showActions.setBills(response.data.bills || []));
      }
    });
  }, []);

  return (
    <Grid container spacing={2}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Customers are lower than 30 or shops are lower than 3 or products are
          lower than 3000
        </Alert>
      </Snackbar>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell align="left" width={"10%"}>
                  Id
                </TableCell>
                <TableCell align="left" width={"20%"}>
                  Customer Name
                </TableCell>
                <TableCell align="left" width={"15%"}>
                  Customer Email
                </TableCell>
                <TableCell align="left" width={"15%"}>
                  Shope Name
                </TableCell>
                <TableCell align="left" width={"10%"}>
                  Shope Location
                </TableCell>
                <TableCell align="left" width={"15%"}>
                  Product Name
                </TableCell>
                <TableCell align="left" width={"15%"}>
                  Product Price
                </TableCell>
              </TableRow>
            </TableHead>
            {isLoading ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={7}>
                    <Box
                      sx={{ display: "flex", justifyContent: "center" }}
                      width={"100%"}
                      flexDirection={"row"}
                    >
                      <CircularProgress />
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {(rowsPerPage > 0
                  ? bills.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : bills
                ).map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">{row.customer.name}</TableCell>
                    <TableCell align="left">{row.customer.email}</TableCell>
                    <TableCell align="left">{row.shop.name}</TableCell>
                    <TableCell align="left">{row.shop.location}</TableCell>
                    <TableCell align="left">{row.product.name}</TableCell>
                    <TableCell align="left">{row.product.price}</TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={7} />
                  </TableRow>
                )}
              </TableBody>
            )}
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, { label: "All", value: -1 }]}
                  colSpan={7}
                  count={bills.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
