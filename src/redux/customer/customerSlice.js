import {createSlice} from "@reduxjs/toolkit";

export const customerSlice = createSlice({
  name: `customer`,
  initialState: {
    user: null,
    accessToken: null
  },
  reducers: {
    setCustomer: (state, action) => {
      const {user, access_token} = action.payload;
      state.user = user;
      state.accessToken = access_token;
    },
    removeCustomer: (state) => {
      state.user = undefined;
      state.accessToken = undefined;
    }
  },
});

export const {setCustomer, removeCustomer} = customerSlice.actions;
export default customerSlice.reducer;