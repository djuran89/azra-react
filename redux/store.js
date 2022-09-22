import { configureStore } from "@reduxjs/toolkit";
import { ordersSlice, productsSlice } from "./action";

// REDUX
const store = configureStore({
  reducer: { orders: ordersSlice.reducer, products: productsSlice.reducer },
});

export default store;
