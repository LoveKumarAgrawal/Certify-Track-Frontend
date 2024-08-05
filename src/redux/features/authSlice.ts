// store/authSlice.ts
import { createSlice} from "@reduxjs/toolkit";

interface AuthState {
  user: any;
  roleId: string | null;
}

const initialState: AuthState = {
  user: null,
  roleId: null,
};


const authDetails = createSlice({
  name: "UserDetails",
  initialState,
  reducers: {
    addLoggedIn: (state) => {
      state.user = JSON.parse(localStorage.getItem('user'))
    },
    logOut: (state) => {
      state.user = null;
      localStorage.clear();
    },
    addUserRoleId: (state, action) => {
        state.roleId = action.payload.userRoleId
    }
  },
});

export const { addLoggedIn, logOut, addUserRoleId } = authDetails.actions;

export default authDetails.reducer;
