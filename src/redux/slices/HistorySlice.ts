import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {RootState} from "../store";
import {fetchQuestions} from "../../actions/asyncActions.ts";
import {getHistoryFromLocalStorage} from '../../actions/getHistoryFromLocalStorage.ts'

interface historyFace {
	historyItems: historyItem[]
}

export type historyItem = {
    date:string,
    questions:number,
    rightAnswers:number
}

const initialState: historyFace = getHistoryFromLocalStorage();

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
		resetHistoryItems: (state) => {
              state.historyItems = [];
        },
        setHistoryItems: (state, action) => {
              state.historyItems = [...state.historyItems, action.payload];
        },

    },
})

export const { resetHistoryItems, setHistoryItems } = historySlice.actions


export default historySlice.reducer