import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './loginSlice'

interface Person {
    name: string
}

const store = configureStore({
    reducer: {
        login: loginReducer
    }
}) 

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;