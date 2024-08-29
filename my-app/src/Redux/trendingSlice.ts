import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {HomeVideoCardDetails} from "../components/Interfaces/propsInterfaces"
import {fetchTrendingDetails} from '../apiCalls'

interface TrendingState {
    isLoading: boolean
    data: HomeVideoCardDetails[]
    errorView: boolean
}

const initialState: TrendingState = {
    isLoading: false,
    errorView: false,
    data: []
}

export const fetchTrendingVideos = createAsyncThunk(
    "trending/fetchTrendingVideos",
    async ()=>{
        try{
            const data = await fetchTrendingDetails()
            return data
        }catch(e){
            return e
        }
    }
)

export const trendingSlice = createSlice({
    name: "trending",
    initialState: initialState, reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrendingVideos.fulfilled, (state, action) => {
                state.data = action.payload
                state.isLoading = false
            })
            .addCase(fetchTrendingVideos.rejected, (state, action) => {
                state.errorView = true
                state.isLoading = false
            })
            .addCase(fetchTrendingVideos.pending, (state, action) => {
                state.isLoading = true
            })
    }
})

export default trendingSlice.reducer