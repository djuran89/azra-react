import { createSlice } from "@reduxjs/toolkit";

// Order
export const ordersSlice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {
    getOrder: (state) => state,
    setOrder: (state, action) => (state = action.payload),
  },
});
export const ordersAction = ordersSlice.actions;

// Products
export const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    getProducts: (state) => state,
    setProducts: (state, action) => (state = action.payload),
  },
});
export const productsAction = productsSlice.actions;
