'use client'
// store.js
// redux/store.js
// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { createSlice } from '@reduxjs/toolkit';

// Create a slice for the state
const initialState = {
  myString: 'nothing',
  myNumber: 0,
  businessname: '',
  value: 0,
};

const mySlice = createSlice({
  name: 'mySlice',
  initialState,
  reducers: {
    setMyString(state, action) {
      state.myString = action.payload;
    },
    setMyNumber(state, action) {
      state.myNumber = action.payload;
    },
    setMybuisnessname(state, action) {
      state.businessname = action.payload;
    },
    setvalue(state, action) {
      state.businessname = action.payload;
    },
  },
});

// Extract actions and reducer
export const { setMyString, setMyNumber,setMybuisnessname,setvalue } = mySlice.actions;
const rootReducer = mySlice.reducer;

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create persistor
const persistor = persistStore(store);

export { store, persistor };
