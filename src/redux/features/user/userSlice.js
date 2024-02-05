import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    isOpenModal: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const { isOpenModal } = userSlice.actions;
export default userSlice.reducer;
