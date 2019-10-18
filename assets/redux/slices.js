import { createSlice } from "redux-starter-kit";

export const usersSlice = createSlice({
  initialState: false,
  reducers: {
    setUsers: (state, action) => !state
  }
});
