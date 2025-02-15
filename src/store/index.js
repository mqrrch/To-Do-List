import { configureStore } from "@reduxjs/toolkit";
import { loadingReducer } from "./loadingSlice";
import { alertReducer } from "./alertSlice";

export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        alert: alertReducer,
    },
})

export default store