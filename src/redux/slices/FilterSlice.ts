import { createSlice } from '@reduxjs/toolkit'

import {RootState} from "../store";
import {fetchQuestions} from "../../actions/asyncActions.ts";


export enum CategoryPropertyEnum {
	ALL = '',
	LINUX = 'linux',
	DEVOPS = 'devops',
	DOCKER = 'docker',
	SQL = 'aql',
	CMS = 'cms',
}

interface filterFace {
	categoryId: number,
	difficultyQuiz: number
}

const initialState: filterFace = {
	categoryId:0,
	difficultyQuiz: 0
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
		setCategory: (state, action) => {
              state.categoryId = action.payload;
        },
		setDifficult: (state, action) => {
              state.difficultyQuiz = action.payload;
        },
    },
})

export const { setCategory,setDifficult } = filterSlice.actions


export default filterSlice.reducer