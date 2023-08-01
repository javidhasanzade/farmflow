import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

const Orders = ({ orders }) => {
  console.log(orders);
  return (
    <div className="px-4 py-3">
      <Typography variant="h2" sx={{ color: "primary.main" }} gutterBottom>
        Order history :
      </Typography>
      <TableContainer component={Paper} className="px-2 py-2">
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Order adress</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Card number</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Total</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Orders;
