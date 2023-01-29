import { configureStore, createSlice } from "@reduxjs/toolkit";

const WeatherData = {};

const slice = createSlice({
  name: "Weather data slice",
  initialState: WeatherData,
  reducers: {
    set: (state, { payload }) => {
      payload.forEach((elm) => {
        const { id, ...rest } = elm;
        state[id] = rest;
      });
      return state;
    },
    remove: (state, { payload }) => {
      delete state[payload];
      return state;
    },
  },
});

export const { set, remove } = slice.actions;

export const store = configureStore({ reducer: slice.reducer });
