import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '@utils/interfaces';

const initialState: IUser = {
  email: '',
  token: '',
  uid: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.uid = action.payload.uid;
    },
    removeUser(state) {
      state.email = '';
      state.token = '';
      state.uid = '';
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
