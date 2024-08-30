import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {VideoContextInterface} from '../components/Interfaces/index'
import {fetchVideoItemDetails} from '../apiCalls'

interface VideoItemState {
    data: VideoContextInterface
    loading: boolean
    errorView: boolean
}

const initialState: VideoItemState = {
    data: {} as VideoContextInterface,
    loading: false,
    errorView: false
}

export const fetchVideoItem = createAsyncThunk(
    "videoItem/fetchVideoItem",
    async(id: string, {rejectWithValue})=>{
        try{
            const data = await fetchVideoItemDetails(id)
            console.log("Data")
            return data
        }catch(e){
            rejectWithValue(e)
            return e
        }
    }
)

export const videoItemSlice = createSlice({
    name: "videoItem",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchVideoItem.fulfilled, (state, action) => {
            state.data = action.payload as VideoContextInterface
            state.loading = false
        })
        .addCase(fetchVideoItem.rejected, (state, action) => {
            state.errorView = true
            state.loading = false
        })
        .addCase(fetchVideoItem.pending, (state, action) => {
            state.loading = true
        })
        

    }
})

export default videoItemSlice.reducer