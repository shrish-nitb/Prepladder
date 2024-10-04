import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: false,
    token: window.localStorage.getItem("token") || null,
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
       
        setLoading(state, value) {
            state.loading = value.payload;
        },
        setToken(state, value) {
            state.token = value.payload
        }
    }
});

export const { setToken, setLoading, setSignupData } = authSlice.actions;
export default authSlice.reducer;