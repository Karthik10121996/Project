import { createSlice } from "@reduxjs/toolkit";

const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: storedCart,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...product, qty: 1 });
      }
    },

    increaseQty: (state, action) => {
      const item = state.items.find((p) => p.id === action.payload);
      if (item) item.qty += 1;
    },

    decreaseQty: (state, action) => {
        const item = state.items.find((p) => p.id === action.payload);
        if (!item) return;

      if (item.qty > 1) {
        item.qty -= 1;
      } else {
        // if qty becomes 0 → remove
        state.items = state.items.filter((p) => p.id !== item.id);
      }
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, increaseQty, decreaseQty, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
