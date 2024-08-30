import { configureStore } from "@reduxjs/toolkit";
import homeReducer from './homeSlice'
import gameReducer from './gameSlice'
import trendingReducer from './trendingSlice'
import videoItemReducer from "./videoItemSlice";

interface Person {
    name: string
}

const store = configureStore({
    reducer: {
        home: homeReducer,
        game: gameReducer,
        trending: trendingReducer,
        videoItem: videoItemReducer
    }
}) 

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;