import { configureStore } from "@reduxjs/toolkit";
import { ordersSlice, productsSlice, userSlice } from "./action";

// REDUX
const store = configureStore({
  reducer: { orders: ordersSlice.reducer, products: productsSlice.reducer, user: userSlice.reducer },
});

export default store;
