import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Stack, Typography } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import OrderProofDialog from "./OrderProofDialog";

const OrdersForSeller = ({ orders }) => {
  // Open state of order proof dialog
  const [open, setOpen] = React.useState(false);
  const [dialogOrder, setDialogOrder] = React.useState({});

  // Order proof dialog open handler
  const handleClickOpen = (order) => {
    setDialogOrder(order);
    setOpen(true);
  };

  // Order proof dialog close handler
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="px-4 py-3">
        <Typography variant="h2" sx={{ color: "primary.main" }} gutterBottom>
          Selling history :
        </Typography>
        <TableContainer component={Paper} className="px-2 py-2">
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Order adress</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Card number</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Total</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Proofs</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((order) => (
                <TableRow
                  key={order.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {`${order.address}, ${order.state}, ${order.country}, ${order.zipCode}`}
                  </TableCell>
                  <TableCell align="left">{order.cardName}</TableCell>
                  <TableCell align="left">{`***********${order.cardNumber?.substring(
                    12,
                    15
                  )}`}</TableCell>
                  <TableCell align="left">{order.email}</TableCell>
                  <TableCell align="left">{`${order.totalPrice}$`}</TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "primary.main" }}
                    >
                      {order.status}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack
                      direction="row"
                      alignItems="center"
                      columnGap={2}
                      justifyContent="center"
                      className="h-full w-full"
                    >
                      <IconButton
                        className="bg-red-400"
                        onClick={() => {
                          handleClickOpen(order);
                        }}
                      >
                        <CameraAltIcon
                          fontSize="small"
                          sx={{ color: "primary.dark" }}
                        />
                      </IconButton>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "primary.main" }}
                      >
                        Awaiting...
                      </Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* {Order Proof Dialog} */}
      <OrderProofDialog
        open={open}
        handleClose={handleClose}
        order={dialogOrder}
      />
    </>
  );
};

export default OrdersForSeller;
