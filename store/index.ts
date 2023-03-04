import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import filterReducer from "./filterSlice";
import wishlistReducer from "./wishlistSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
	reducer: {
		filter: filterReducer,
		auth: authReducer,
		wishlist: wishlistReducer,
		cart: cartReducer,
	},
});
