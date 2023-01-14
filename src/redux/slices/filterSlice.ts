import { FilterSliceState, SortPropertyEnum, FilterSortType } from './filterSliceTypes';
import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sortType: { name: 'самым популярным', sortProperty: SortPropertyEnum.RATING_DESC },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSortType: (state, action: PayloadAction<FilterSortType>) => {
      state.sortType = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const selectSortType = (state: RootState) => state.filter.sortType;
export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setSortType, setCurrentPage, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
