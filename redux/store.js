import { configureStore } from "@reduxjs/toolkit";
import LanguageReducer from "./LanguageSlice"

export const store = configureStore({
    reducer: {
        CHOOSE_LANGUAGE: LanguageReducer
    }
})