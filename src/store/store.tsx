import { reduxBatch } from "@manaflair/redux-batch";
import {
  configureStore,
} from "@reduxjs/toolkit";

import rootReducer from './rootReducers'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const initialState = {user: null, isLoadingUser: false}

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env["NODE_ENV"] !== "production",
  preloadedState: {},
  enhancers: [reduxBatch]
});

// const store = createStore(
//   rootReducer,
//   initialState,
//   composeEnhancers()
// )

export default store;
export type RootState = ReturnType<typeof rootReducer>