import { configureStore } from '@reduxjs/toolkit'
import questions from './slices/QuestionSlice'
import history from './slices/HistorySlice'
import filters from './slices/FilterSlice'

export const store = configureStore({
    reducer: {
        questions,
        history,
        filters
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch