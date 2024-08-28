import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface LoginInterface{
    username: string
    password: string
    showPassword: boolean
    jwt_token?: string
    loginStatus?: boolean
    error?: string
}

const initialState: LoginInterface = {
    username: "",
    password: "",
    showPassword: false,
}

export const fetchLogin = createAsyncThunk(
    "login/fetchLogin",
    async (_, thunkAPI) => {
        const {getState} = thunkAPI
        const state = getState() as RootState 
        const {username, password} = state.login
        const request = await fetch("https://apis.ccbp.in/login", {
            method: "POST",
            body: JSON.stringify({username, password})
        })
        const response = await request.json()
        if(request.ok){
            return response.jwt_token
        }
        throw new Error(response.error_msg)
    },
)

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload
        },
        setTogglePassword: (state, action) => {
            state.showPassword = !state.showPassword
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchLogin.fulfilled, (state, action) => {
            state.jwt_token = action.payload;
          })
          .addCase(fetchLogin.rejected, (state, action) => {
            state.error = action.error.message;
          });
      }
})

export const {setUsername, setPassword, setTogglePassword} = loginSlice.actions
export default loginSlice.reducer