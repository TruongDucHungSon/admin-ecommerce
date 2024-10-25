// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../feature/category/sliceCategory";
import orderReducer from "../feature/order/orderSlice";
import {
  default as authReducer,
  default as productReducer,
} from "../feature/product/productSlice";
import userReducer from "../feature/user/userSlice";

const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
    auth: authReducer,
    user: userReducer,
    order: orderReducer,
  },
});

export default store;
