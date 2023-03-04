import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
	name: "wishlist",
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
	},
});

export const wishlistActions = wishlistSlice.actions;

export default wishlistSlice.reducer;
