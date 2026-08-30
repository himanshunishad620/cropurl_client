// store.js
import { qrApi } from "@/api/qrApi";
import { settingApi } from "@/api/settingApi";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [qrApi.reducerPath]: qrApi.reducer,
    [settingApi.reducerPath]: settingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(qrApi.middleware, settingApi.middleware),
});
