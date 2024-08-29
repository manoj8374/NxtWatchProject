import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {HomeVideoCardDetails} from "../components/Interfaces/propsInterfaces"
import { fetchHomeDetails } from "../apiCalls";
import {RootState} from '../Redux/store'

interface HomeState{
    data: HomeVideoCardDetails[],
    isLoading: boolean,
    errorView: boolean
}

const initialState: HomeState = {
    data: [],
    isLoading: false,
    errorView: false
};

export const fetchHomeVideos = createAsyncThunk(
    "home/fetchHomeVideos",
    async (searchValue: string, {rejectWithValue}) => {
        try{
            const data = await fetchHomeDetails(searchValue)
            console.log(data, "this is data")
            return data
        }catch(e){
            return rejectWithValue(e)
        }
    },
)

export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHomeVideos.fulfilled, (state, action) => {
                state.data = action.payload
                state.isLoading = false
            })
            .addCase(fetchHomeVideos.rejected, (state, action) => {
                state.errorView = true
                state.isLoading = false
            })
            .addCase(fetchHomeVideos.pending, (state, action) => {
                state.isLoading = true
                state.errorView = false
            })
    }
});

export default homeSlice.reducer