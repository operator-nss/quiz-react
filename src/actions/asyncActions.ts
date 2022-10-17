import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {question} from '../components/Quiz/Quiz';

export type SearchQuestionParams = {
  category: string;
  difficulty: string;
};

export const fetchQuestions = createAsyncThunk<question[], SearchQuestionParams>(
  'questions/fetchQuestions',
  async (params, {rejectWithValue}) => {
    const {category, difficulty} = params;

    try {
      const {data} = await axios.get<question[]>(
        `https://quizapi.io/api/v1/questions${category}${difficulty}`,
        {
          headers: {
            'X-Api-Key': 'bMgxLERwud50gzTegOG3L5XaCI0M9W4cEvmTUST9',
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
