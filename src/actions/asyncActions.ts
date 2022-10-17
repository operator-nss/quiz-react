import {question} from "./slices/QuestionSlice.ts";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export type SearchPizzaParams = {
	category: string,
	difficulty: string
}

export const fetchQuestions = createAsyncThunk<question[], SearchQuestionParams>(
    'questions/fetchQuestions',
    async (params, {rejectWithValue}) => {
    		const {
    			category,
    			difficulty
    		} = params;

        try {
            const {data} = await axios.get<any>(`https://quizapi.io/api/v1/questions${category}${difficulty}`, {
                        headers: {
                        'X-Api-Key': 'bMgxLERwud50gzTegOG3L5XaCI0M9W4cEvmTUST9',
                        }
                    });
            return data;
        } catch (e: any) {
            return rejectWithValue(e.message);
        }
    }
)
