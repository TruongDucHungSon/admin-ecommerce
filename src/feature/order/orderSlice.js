// src/redux/userSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrder = createAsyncThunk("order/fetchOrders", async () => {
  const response = await axios.get(
    "https://ecommerce-api-mcqr.onrender.com/oder"
  );
  return response.data;
});

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async (order) => {
    const response = await axios.put(
      `https://ecommerce-api-mcqr.onrender.com/oder/${order._id}`,
      order
    );
    return response.data;
  }
);

export const deleteOrder = createAsyncThunk("order/deleteOrder", async (id) => {
  await axios.delete(`https://ecommerce-api-mcqr.onrender.com/oder/${id}`);
  return id;
});

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateOrder.fulfilled, (state, action) => {
        const index = state.order.findIndex(
          (order) => order._id === order.payload._id
        );
        if (index !== -1) {
          state.order[index] = action.payload;
        }
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.order = state.order.filter(
          (order) => order._id !== action.payload
        );
      });
  },
});

export const selectOrder = (state) => state.order.order;

export default orderSlice.reducer;
