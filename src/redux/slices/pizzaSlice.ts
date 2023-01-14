import { RootState } from './../store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import configFile from '../../config.json';

type FetchPizzasParams = Record<string, string>;

const baseUrl = configFile.apiEndpoint;

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: FetchPizzasParams) => {
    const { sortBy, orderAsc, categorySort, search, currentPage } = params;
    const { data } = await axios.get<PizzaItem[]>(
      baseUrl +
        `?page=${currentPage}&limit=4&${categorySort}&sortBy=${sortBy}&order=${orderAsc}${search}`,
    );
    return data as PizzaItem[];
  },
);

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'succes',
  ERROR = 'error',
}

type PizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error для обработки ошибок запроса
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
