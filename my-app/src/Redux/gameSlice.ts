import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {GamingCardDetails} from '../components/Interfaces/propsInterfaces'
import { fetchGameDetails } from "../apiCalls";

interface GameState {
    isLoading: boolean
    errorView: boolean
    data: GamingCardDetails[]
}

const initialState: GameState = {
    isLoading: false,
    data: [],
    errorView: false
}

export const fetchGamingDetails = createAsyncThunk(
    "game/fetchGameDetails",
    async (_, {rejectWithValue}) =>{
        try{
            const data = await fetchGameDetails()
            return data
        }catch(e){
            return rejectWithValue(e)
        }
    }
)

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGamingDetails.fulfilled, (state, action) => {
                state.data = action.payload
                state.isLoading = false
            })
            .addCase(fetchGamingDetails.rejected, (state, action) => {
                state.isLoading = false
                state.errorView = true
            })
            .addCase(fetchGamingDetails.pending, (state, action) => {
                state.isLoading = true
                state.errorView = false
            })
    }
})

export default gameSlice.reducer