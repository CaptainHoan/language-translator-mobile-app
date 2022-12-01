import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chosenSourceLanguage: "",
    chosenTargetLanguage: ""
};

export const LanguageSlice = createSlice({
    name: 'CHOOSE_LANGUAGE',
    initialState,
    reducers: {
        chooseSourceLang: (state, action) => {
            state.chosenSourceLanguage = action.payload;
            console.log("chosenSourceLanguage is", state.chosenSourceLanguage)
        },
        chooseTargetLang: (state, action) => {
            state.chosenTargetLanguage = action.payload;
            console.log("chosenTargetLanguage is", state.chosenTargetLanguage)
        }
    }
})

//export actions produced by LanguageSlice 
export const { chooseSourceLang, chooseTargetLang } = LanguageSlice.actions;

//export LangSelector && textSelector
export const sourceLangSelector = (state) => state.CHOOSE_LANGUAGE.chosenSourceLanguage;
export const targetLangSelector = (state) => state.CHOOSE_LANGUAGE.chosenTargetLanguage;

//export LanguageReducer
export default LanguageSlice.reducer;
