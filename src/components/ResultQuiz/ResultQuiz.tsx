import React, { FC, useEffect, useRef } from 'react';
import { getHistoryFromLocalStorage } from '../../actions/getHistoryFromLocalStorage';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setDifficult } from '../../redux/slices/FilterSlice';
import { setHistoryItems } from '../../redux/slices/HistorySlice';
import { setResetQuiz } from '../../redux/slices/QuestionSlice';

const ResultQuiz: FC = () => {
  const { questionsItems, rightAnswers } = useAppSelector((state) => state.questions);
  const { historyItems } = useAppSelector((state) => state.history);
  const dispatch = useAppDispatch();
  const isMounted = useRef(false);

  const resetQuiz = () => {
    dispatch(setResetQuiz());
    dispatch(setDifficult(0));
  };

  function setMonth(month: number) {
    return month < 10 ? `0${month}` : month;
  }

  function setMinutes(minutes: number) {
    return minutes < 10 ? `0${minutes}` : minutes;
  }

  function setDays(day: number) {
    return day < 10 ? `0${day}` : day;
  }

  useEffect(() => {
    if (!isMounted.current) {
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const hour = date.getHours();
      const minutes = date.getMinutes();
      const time = `${setDays(day)}.${setMonth(month)}.${year} ${hour}:${setMinutes(minutes)}`;
      const result = {
        date: time,
        rightAnswers,
        questions: questionsItems.length,
      };
      localStorage.setItem('quiz', JSON.stringify([...historyItems, result]));
      getHistoryFromLocalStorage();
      dispatch(setHistoryItems(result));
      isMounted.current = true;
    }
  }, []);

  return (
    <div className="container">
      <div className="mx-auto mt-10 max-w-5xl rounded-lg border bg-white py-8 px-10">
        <h1 className="text-center text-3xl font-bold">Quiz закончен</h1>
        <div className="mx-auto mt-10 max-w-xl">
          <div className="mb-4 flex items-center justify-between">
            <div>Всего вопросов :</div>
            <div>{questionsItems.length}</div>
          </div>
          <div className="flex items-center justify-between">
            <div>Правильных ответов :</div>
            <div>{rightAnswers}</div>
          </div>
          <button
            onClick={resetQuiz}
            className="mx-auto mt-6 flex rounded border px-6 py-3 transition-colors hover:bg-emerald-500 hover:text-white"
          >
            Начать заново
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultQuiz;
