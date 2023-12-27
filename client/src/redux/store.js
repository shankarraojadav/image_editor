import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { uploadImageReducer } from "./reducers/imageReducers";

const rootReducer = combineReducers({
  upload: uploadImageReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
