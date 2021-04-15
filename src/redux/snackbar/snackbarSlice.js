import {createSlice} from "@reduxjs/toolkit";

export const snackbarSlice = createSlice({
  name: `snackbar`,
  initialState: {
    open: false,
    type: `info`,
    message: ``
  },
  reducers: {
    showInfo: (state, action) => {
      state.open = true;
      state.type = `info`;
      state.message = action.payload;
    },
    showError: (state, action) => {
      state.open = true;
      state.type = `error`;
      state.message = action.payload;
    },
    showSuccess: (state, action) => {
      state.open = true;
      state.type = `success`;
      state.message = action.payload;
    },
    hideSnackbar: (state) => {
      state.open = false;
    }
  }
});

export const {showInfo, showError, showSuccess, hideSnackbar} = snackbarSlice.actions;
export default snackbarSlice.reducer;