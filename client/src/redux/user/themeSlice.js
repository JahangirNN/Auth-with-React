import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode:'dark',
};

const themeSlice = createSlice({
    name:'theme',
    initialState,
    reducers:{
        darkMode:(state) => {
            state.mode = 'dark';
        },
        lightMode:(state) =>{
            state.mode = 'light';
        }
    }

})


export const {darkMode, lightMode} = themeSlice.actions;

export default themeSlice.reducer;