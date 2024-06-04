import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isAuth : false,
    user: null
} as any

const authDetails = createSlice({
    name: "UserDetails",
    initialState,
    reducers: {
        addLoggedIn: (state) => {
            state.isAuth = Boolean(localStorage.getItem('isAuth'))
            state.user = JSON.parse(localStorage.getItem('user'))
        },
        logOut: (state) => {
            state.isAuth = false;
            state.user = null;
            localStorage.clear();
        }
    }
})

export const { addLoggedIn, logOut } = authDetails.actions;

export default authDetails.reducer