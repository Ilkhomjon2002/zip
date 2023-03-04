import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		items: [],
	},
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
		removeItem(state, { payload: { id, wishlistItems } }: any) {
			state.items = wishlistItems.filter((item: any) => id !== item.id);
		},
		clear(state, action) {
			state.items = [];
		},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
