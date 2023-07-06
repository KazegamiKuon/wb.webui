import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Snackbar,
  TableFooter,
  TablePagination,
  TextField,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import customerApi from "api/customerApi";
import productApi from "api/productApi";
import shopApi from "api/shopApi";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { TablePaginationActions } from "components/TablePaginationActions";
import { Customer } from "models/customer";
import { Product } from "models/product";
import { Shop } from "models/shop";
import React, { useEffect, useState } from "react";
import useStateReducer from "utils/common";
import {
  adminActions,
  customerLoadingSelector,
  customersSelector,
  productLoadingSelector,
  productsSelector,
  shopLoadingSelector,
  shopsSelector,
} from "./adminSlice";

export function Admin() {
  const dispatch = useAppDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [openCustomerAlert, setCustomerAlert] = useState(false);

  // selctor
  const originCustomers = useAppSelector(customersSelector);
  const originShops = useAppSelector(shopsSelector);
  const originProducts = useAppSelector(productsSelector);
  const isCustomerLoading = useAppSelector(customerLoadingSelector);
  const isShopLoading = useAppSelector(shopLoadingSelector);
  const isProductLoading = useAppSelector(productLoadingSelector);
  // func
  const getRandomKey = () => {
    return Math.floor(Math.random() * 0x10000).toString(16);
  };

  const [newCustomer, setNewCustomer] = useStateReducer<Customer>({
    id: `cus` + getRandomKey(),
    name: "",
    dateOfBirth: "",
    email: "",
    isNew: true,
    isDeleted: false,
  });

  const [newShop, setNewShop] = useStateReducer<Shop>({
    id: `shop` + getRandomKey(),
    name: "",
    location: "",
    isNew: true,
    isDeleted: false,
  });

  const [newProduct, setNewProduct] = useStateReducer<Product>({
    id: `prod` + getRandomKey(),
    name: "",
    price: "",
    isNew: true,
    isDeleted: false,
  });

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

  const handleCustomerAlertClose = () => {
    setCustomerAlert(false);
  };
  const getShopData = () => {
    dispatch(adminActions.setShopIsLoading());
    shopApi.getAll().then((res) => dispatch(adminActions.setShops(res.data)));
  };
  const getCustomerData = () => {
    dispatch(adminActions.setCustomerIsLoading());
    customerApi
      .getAll()
      .then((res) => dispatch(adminActions.setCustomers(res.data)));
  };
  const getProductData = () => {
    dispatch(adminActions.setProductIsLoading());
    productApi
      .getAll()
      .then((res) => dispatch(adminActions.setProducts(res.data)));
  };
  const handleSaveChange = () => {
    let newCustomers = customers.filter(
      (data) => data.isNew && !data.isDeleted
    );
    let newShops = shops.filter((data) => data.isNew && !data.isDeleted);
    let newProducts = products.filter((data) => data.isNew && !data.isDeleted);
    if (newCustomers.length > 0) {
      dispatch(adminActions.setCustomerIsLoading());
      customerApi
        .createCustomers(newCustomers)
        .then((res) => getCustomerData());
    }
    if (newShops.length > 0) {
      dispatch(adminActions.setShopIsLoading());
      shopApi.createShops(newShops).then((res) => getShopData());
    }
    if (newProducts.length > 0) {
      dispatch(adminActions.setProductIsLoading());
      productApi.createProducts(newProducts).then((res) => getProductData());
    }
  };

  // useEffect
  useEffect(() => {
    setShops(originShops);
  }, [originShops]);
  useEffect(() => {
    setCustomers(originCustomers);
  }, [originCustomers]);
  useEffect(() => {
    setProducts(originProducts);
  }, [originProducts]);
  useEffect(() => {
    getShopData();
    getCustomerData();
    getProductData();
  }, []);
  return (
    <Grid container spacing={2}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        open={openCustomerAlert}
        autoHideDuration={3000}
        onClose={handleCustomerAlertClose}
      >
        <Alert
          onClose={handleCustomerAlertClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Must full fill all value
        </Alert>
      </Snackbar>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleSaveChange}>
          Save Change
        </Button>
      </Grid>
      <Grid item xs={8}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell align="left" width={"8%"}>
                  Id
                </TableCell>
                <TableCell align="left" width={"30%"}>
                  Name
                </TableCell>
                <TableCell align="left" width={"25%"}>
                  Date of birth
                </TableCell>
                <TableCell align="left" width={"25%"}>
                  Email
                </TableCell>
                <TableCell align="left" width={"12%"}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            {isCustomerLoading ? (
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
                <TableRow
                  key={"addNewCustomer"}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{newCustomer.id}</TableCell>
                  <TableCell align="left">
                    <TextField
                      fullWidth
                      id="customerName"
                      label="Name"
                      variant="standard"
                      value={newCustomer.name}
                      onChange={(element) =>
                        setNewCustomer({ name: element.target.value })
                      }
                    />
                  </TableCell>
                  <TableCell align="left">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Date of birth"
                        value={newCustomer.dateOfBirth}
                        onChange={(newValue) => {
                          console.log(newValue?.toString());
                          setNewCustomer({ dateOfBirth: newValue?.toString() });
                        }}
                      />
                    </LocalizationProvider>
                  </TableCell>
                  <TableCell align="left">
                    <TextField
                      fullWidth
                      id="customerEmmail"
                      label="Email"
                      variant="standard"
                      value={newCustomer.email}
                      onChange={(element) =>
                        setNewCustomer({ email: element.target.value })
                      }
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      variant="contained"
                      onClick={(e) => {
                        if (
                          !newCustomer.name ||
                          !newCustomer.dateOfBirth ||
                          !newCustomer.email
                        ) {
                          setCustomerAlert(true);
                        } else {
                          setCustomers([{ ...newCustomer }, ...customers]);
                          setNewCustomer({
                            id: `cus` + getRandomKey(),
                            name: "",
                            dateOfBirth: "",
                            email: "",
                            isNew: true,
                            isDeleted: false,
                          });
                        }
                      }}
                    >
                      Add
                    </Button>
                  </TableCell>
                </TableRow>
                {customers.map((row, index) => (
                  <TableRow
                    key={row.id}
                    selected={row.isDeleted}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.dateOfBirth}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">
                      {row.isNew ? (
                        row.isDeleted ? (
                          <Button
                            variant="contained"
                            onClick={(e) => {
                              customers[index].isDeleted = false;
                              setCustomers(customers.map((value) => value));
                            }}
                          >
                            Undo
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            onClick={(e) => {
                              customers[index].isDeleted = true;
                              setCustomers(customers.map((value) => value));
                            }}
                          >
                            Delete
                          </Button>
                        )
                      ) : (
                        <></>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={4}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 300 }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left" width={"10%"}>
                      Id
                    </TableCell>
                    <TableCell align="left" width={"45%"}>
                      Name
                    </TableCell>
                    <TableCell align="left" width={"30%"}>
                      Location
                    </TableCell>
                    <TableCell align="left" width={"15%"}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                {isShopLoading ? (
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
                    <TableRow
                      key={"addNewShop"}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{newShop.id}</TableCell>
                      <TableCell align="left">
                        <TextField
                          fullWidth
                          id="shopName"
                          label="Name"
                          variant="standard"
                          value={newShop.name}
                          onChange={(element) =>
                            setNewShop({ name: element.target.value })
                          }
                        />
                      </TableCell>
                      <TableCell align="left">
                        <TextField
                          fullWidth
                          id="shopLocation"
                          label="Location"
                          variant="standard"
                          value={newShop.location}
                          onChange={(element) =>
                            setNewShop({ location: element.target.value })
                          }
                        />
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          variant="contained"
                          onClick={(e) => {
                            if (!newShop.name || !newShop.location) {
                              setCustomerAlert(true);
                            } else {
                              setShops([{ ...newShop }, ...shops]);
                              setNewShop({
                                id: `shop` + getRandomKey(),
                                name: "",
                                location: "",
                                isNew: true,
                                isDeleted: false,
                              });
                            }
                          }}
                        >
                          Add
                        </Button>
                      </TableCell>
                    </TableRow>
                    {shops.map((row, index) => (
                      <TableRow
                        key={row.id}
                        selected={row.isDeleted}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">{row.id}</TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.location}</TableCell>
                        <TableCell align="left">
                          {row.isNew ? (
                            row.isDeleted ? (
                              <Button
                                variant="contained"
                                onClick={(e) => {
                                  shops[index].isDeleted = false;
                                  setShops(shops.map((value) => value));
                                }}
                              >
                                Undo
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                onClick={(e) => {
                                  shops[index].isDeleted = true;
                                  setShops(shops.map((value) => value));
                                }}
                              >
                                Delete
                              </Button>
                            )
                          ) : (
                            <></>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 300 }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left" width={"10%"}>
                      Id
                    </TableCell>
                    <TableCell align="left" width={"45%"}>
                      Name
                    </TableCell>
                    <TableCell align="left" width={"30%"}>
                      Price
                    </TableCell>
                    <TableCell align="left" width={"15%"}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                {isProductLoading ? (
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
                    <TableRow
                      key={"addNewProduct"}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{newProduct.id}</TableCell>
                      <TableCell align="left">
                        <TextField
                          fullWidth
                          id="productName"
                          label="Name"
                          variant="standard"
                          value={newProduct.name}
                          onChange={(element) =>
                            setNewProduct({ name: element.target.value })
                          }
                        />
                      </TableCell>
                      <TableCell align="left">
                        <TextField
                          fullWidth
                          id="productPrice"
                          label="Price"
                          variant="standard"
                          value={newProduct.price}
                          onChange={(element) =>
                            setNewProduct({ price: element.target.value })
                          }
                        />
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          variant="contained"
                          onClick={(e) => {
                            if (!newProduct.name || !newProduct.price) {
                              setCustomerAlert(true);
                            } else {
                              setProducts([{ ...newProduct }, ...products]);
                              setNewProduct({
                                id: `prod` + getRandomKey(),
                                name: "",
                                price: "",
                                isNew: true,
                                isDeleted: false,
                              });
                            }
                          }}
                        >
                          Add
                        </Button>
                      </TableCell>
                    </TableRow>
                    {(rowsPerPage > 0
                      ? products.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : products
                    ).map((row, index) => (
                      <TableRow
                        key={row.id}
                        selected={row.isDeleted}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">{row.id}</TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.price}</TableCell>
                        <TableCell align="left">
                          {row.isNew ? (
                            row.isDeleted ? (
                              <Button
                                variant="contained"
                                onClick={(e) => {
                                  shops[index].isDeleted = false;
                                  setShops(shops.map((value) => value));
                                }}
                              >
                                Undo
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                onClick={(e) => {
                                  shops[index].isDeleted = true;
                                  setShops(shops.map((value) => value));
                                }}
                              >
                                Delete
                              </Button>
                            )
                          ) : (
                            <></>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[10, { label: "All", value: -1 }]}
                      colSpan={7}
                      count={products.length}
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
      </Grid>
    </Grid>
  );
}
