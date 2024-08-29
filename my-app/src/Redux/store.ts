import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './loginSlice'
import homeReducer from './homeSlice'
import gameReducer from './gameSlice'
import trendingReducer from './trendingSlice'

interface Person {
    name: string
}

const store = configureStore({
    reducer: {
        login: loginReducer,
        home: homeReducer,
        game: gameReducer,
        trending: trendingReducer
    }
}) 

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;