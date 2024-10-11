
'use client'
// redux/myReducer.js
// redux/myReducer.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  myString: '',
  myNumber: 0,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
};

// Example async action using createAsyncThunk
export const fetchData = createAsyncThunk('myData/fetchData', async () => {
  // Simulating an API call
  const response = await new Promise((resolve) =>
    setTimeout(() => resolve({ data: 'Hello World', number: 42 }), 1000)
  );
  return response;
});

const mySlice = createSlice({
  name: 'myData',
  initialState,
  reducers: {
    setString: (state, action) => {
      state.myString = action.payload;
    },
    setNumber: (state, action) => {
      state.myNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.myString = action.payload.data;
        state.myNumber = action.payload.number;
        state.status = 'succeeded';
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setString, setNumber } = mySlice.actions;
export default mySlice.reducer;
