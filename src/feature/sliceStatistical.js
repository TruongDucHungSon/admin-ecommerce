import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const revenueStatistics = createAsyncThunk(
  "statistical/revenueStatistics",
  async () => {
    const response = await axios.get(
      "https://ecommerce-api-mcqr.onrender.com/oder/revenueStatistics"
    );
    return response.data;
  }
);

export const soldProductsStatistics = createAsyncThunk(
  "statistical/soldProductsStatistics",
  async () => {
    const response = await axios.get(
      "https://ecommerce-api-mcqr.onrender.com/oder/soldProductsStatistics"
    );
    return response.data;
  }
);

export const soldProductsStatisticsById = createAsyncThunk(
  "statistical/soldProductsStatisticsById",
  async () => {
    const response = await axios.get(
      "https://ecommerce-api-mcqr.onrender.com/oder/soldProductsStatisticsById"
    );
    return response.data;
  }
);
