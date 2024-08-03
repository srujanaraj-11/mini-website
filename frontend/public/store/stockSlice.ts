import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStockData = createAsyncThunk(
  'stock/fetchStockData',
  async (symbol: string) => {
    const response = await axios.get(`/api/stocks/${symbol}`);
    return response.data;
  }
);

const stockSlice = createSlice({
  name: 'stock',
  initialState: {
    data: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStockData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchStockData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default stockSlice.reducer;
