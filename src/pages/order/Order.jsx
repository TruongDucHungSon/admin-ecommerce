import { Delete as DeleteIcon } from "@mui/icons-material";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrder,
  fetchOrder,
  selectOrder,
} from "../../feature/order/orderSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrder);
  const loading = useSelector((state) => state.order.loading);

  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      dispatch(deleteOrder(id));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <TableContainer component={Paper}>
      <h2 className="mb-4 text-2xl font-semibold">Orders List</h2>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Items</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row._id.substring(0, 6)}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>0{row.phone}</TableCell>
              <TableCell>0{row.phone}</TableCell>
              <TableCell>{row.total}$</TableCell>
              <TableCell>
                {new Date(row.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <IconButton
                  color="secondary"
                  aria-label="Delete"
                  onClick={() => handleDelete(row._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Orders;
