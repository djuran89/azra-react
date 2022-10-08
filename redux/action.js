import { createSlice } from "@reduxjs/toolkit";

// Order
export const ordersSlice = createSlice({
	name: "orders",
	initialState: [],
	reducers: {
		getOrder: (state) => state,
		setOrder: (state, action) => (state = action.payload),
		addQuantity: (array, action) => {
			const i = array.map((el) => el.id).indexOf(action.payload.id);
			return array.map((item, index) => {
				if (index !== i) {
					return item;
				}

				return {
					...item,
					...action.payload,
				};
			});
		},
	},
});
export const ordersAction = ordersSlice.actions;

// Products
const onlyUnique = (value, index, self) => self.indexOf(value) === index;
export const productsSlice = createSlice({
	name: "products",
	initialState: [],
	reducers: {
		getProducts: (state) => state,
		setProducts: (state, action) => (state = action.payload),
		category: (state) => (state = []),
	},
});
export const productsAction = productsSlice.actions;

// User
export const userSlice = createSlice({
	name: "user",
	initialState: null,
	reducers: {
		setUser: (state, action) => (state = action.payload),
	},
});
export const userAction = userSlice.actions;
