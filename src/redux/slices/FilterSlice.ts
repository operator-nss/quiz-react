import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum CategoryPropertyEnum {
  ALL = '',
  LINUX = 'linux',
  DEVOPS = 'devops',
  DOCKER = 'docker',
  SQL = 'aql',
  CMS = 'cms',
}

interface filterFace {
  categoryId: number;
  difficultyQuiz: number;
}

const initialState: filterFace = {
  categoryId: 0,
  difficultyQuiz: 0,
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setDifficult: (state, action: PayloadAction<number>) => {
      state.difficultyQuiz = action.payload;
    },
  },
});

export const { setCategory, setDifficult } = filterSlice.actions;

export default filterSlice.reducer;
