import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    lang: "EN",
}

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLang: (state, action) => {
            state.lang = action.payload
        }        
    }
})

export const { setLang } = languageSlice.actions
export default languageSlice.reducer
