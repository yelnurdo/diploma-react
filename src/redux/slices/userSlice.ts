import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  uid: string;
  email: string;
  token: string;
}

const initialState: UserState = {
  uid: '',
  email: '',
  token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    removeUser(state) {
      state.uid = '';
      state.email = '';
      state.token = '';
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
