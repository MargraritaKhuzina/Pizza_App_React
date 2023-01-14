import { CalcTotalPrice } from './../../utils/calcTotalPrice';
import { getCartFromLS } from './../../utils/getCartFromLocalStorage';
import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

// getCartFromLS - get cart from local storage
// получаем объекты и итоговую стоимость товаров в корзине
const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice,
  items,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find((object) => object.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = CalcTotalPrice(state.items);
    },
    minusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((object) => object.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = CalcTotalPrice(state.items);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((object) => object.id !== action.payload);
      state.totalPrice = CalcTotalPrice(state.items);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((object) => object.id === id);

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
