import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
    dataList : []
}

export const fetchDataList = createAsyncThunk(
    'dataList/fetchDataList',
    () => {
        return fetch(`https://jsonplaceholder.typicode.com/posts`)
            .then((res) => res.json())
            .then((data) => data)

    }
)

const postsSlice = createSlice({
    name: 'data',
    initialState,
    extraReducers: (builder => {
        builder
            .addCase(fetchDataList.fulfilled,(state,action) => {
                state.dataList = action.payload;
            })
    })
})

const {reducer:postReducer} = postsSlice;
export {postReducer}
