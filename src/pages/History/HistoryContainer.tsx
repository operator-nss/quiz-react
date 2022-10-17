import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHistoryFromLocalStorage } from '../../actions/getHistoryFromLocalStorage';
import toni from '../../assets/toni.jpg';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { resetHistoryItems } from '../../redux/slices/HistorySlice';
import { setResetQuiz } from '../../redux/slices/QuestionSlice';
import History from './History';

const HistoryContainer: FC = () => {
  const { historyItems } = useAppSelector((state) => state.history);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getHistoryFromLocalStorage();
  }, []);

  const resetLocalStorage = () => {
    dispatch(resetHistoryItems());
    dispatch(setResetQuiz());
    localStorage.removeItem('quiz');
  };

  return (
    <div className="container">
      <div className="mx-auto mt-10 max-w-5xl rounded-lg border bg-white py-8 px-5 md:px-10">
        <h2 className="text-center text-2xl font-bold">
          {historyItems?.length === 0 ? 'Истории игр нет' : 'История'}
        </h2>
        {historyItems?.map((item, i) => (
            <History
              key={i}
              date={item.date}
              questions={item.questions}
              rightAnswers={item.rightAnswers}
            />
          ))}
        <div className="text-center">
          {historyItems?.length ? (
            <Link
              to="/"
              onClick={resetLocalStorage}
              className="mx-auto mt-6 inline-flex rounded
                     border px-6 py-3 transition-colors hover:bg-emerald-500 hover:text-white"
            >
              сброс
            </Link>
          ) : (
            <div className="mt-10 text-2xl font-bold">
              <div>
                <img className="mx-auto" src={toni} alt="" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryContainer;
