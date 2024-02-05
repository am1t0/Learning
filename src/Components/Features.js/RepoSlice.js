import { createSlice } from "@reduxjs/toolkit";

const initialState={
   
}
const RepoSlice = createSlice({
    name: 'repos',
    initialState,
    reducers:{
        addRepo:(state,action)=>{
            state.repos.unshift(action.payload);
            console.log(state.repos)
        }
    }
})