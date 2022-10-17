import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchQuestions } from '../../actions/asyncActions';
import { question } from '../../components/Quiz/Quiz';

interface questionFace {
  status: string;
  questionsItems: question[];
  questionNumber: number;
  rightAnswers: number;
  selectedAnswers: string[];
  endQuiz: boolean;
  restartQuiz: boolean;
  error: any;
}

const initialState: questionFace = {
  status: 'idle',
  questionsItems: [],
  questionNumber: 0,
  rightAnswers: 0,
  selectedAnswers: [],
  endQuiz: false,
  restartQuiz: false,
  error: '',
};

export const questionSLice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestionNumber: (state) => {
      state.questionNumber += 1;
    },
    setRightNumber: (state) => {
      state.rightAnswers += 1;
    },
    setSelectAnswer: (state, action) => {
      const findItem = state.selectedAnswers.find((item) => item === action.payload);
      if (findItem) {
        state.selectedAnswers.filter((item) => item !== action.payload);
      } else {
        state.selectedAnswers.push(action.payload);
      }
    },
    setEnd: (state) => {
      state.endQuiz = !state.endQuiz;
    },
    setRestartQuiz: (state) => {
      state.restartQuiz = !state.restartQuiz;
    },
    setResetQuiz: (state) => {
      state.endQuiz = !state.endQuiz;
      state.questionNumber = 0;
      state.rightAnswers = 0;
      state.restartQuiz = false;
      state.selectedAnswers = [];
      state.questionsItems = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.pending, (state) => {
      state.status = 'questions loading';
      state.questionsItems = [];
    });
    builder.addCase(fetchQuestions.fulfilled, (state, action: PayloadAction<any>) => {
      state.questionsItems = [...action.payload];
      state.status = 'questions success';
    });
    builder.addCase(fetchQuestions.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    });
  },
});

export const {
  setQuestionNumber,
  setRightNumber,
  setSelectAnswer,
  setRestartQuiz,
  setEnd,
  setResetQuiz,
} = questionSLice.actions;

export default questionSLice.reducer;
