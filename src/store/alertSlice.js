import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    alertType: null,
};

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state, action) => {
            state.alertType = action.payload.alertType;
        },
        clearAlert: (state) => {
            state.alertType = null;
        },
    }
})

export const { showAlert, clearAlert } = alertSlice.actions;
export const alertReducer = alertSlice.reducer;