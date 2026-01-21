import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import erpCrmReducer from "./ErpCrmSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    system: erpCrmReducer,
  },
});
