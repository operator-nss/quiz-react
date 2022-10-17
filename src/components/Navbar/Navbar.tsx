import React, { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import chooseImage from '../../assets/choose.png';
import quizImage from '../../assets/quiz.png';
import { useAppDispatch } from '../../hooks/hooks';
import { setDifficult } from '../../redux/slices/FilterSlice';
import { setResetQuiz } from '../../redux/slices/QuestionSlice';

const Navbar: FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const activeStyle = {
    color: '#fff',
    background: '#1E88E5',
  };

  const reloadApp = () => {
    if (pathname !== '/') {
      dispatch(setResetQuiz());
      dispatch(setDifficult(0));
    }
  };

  return (
    <header className="w-screen bg-blue-300">
      <div className="container">
        <div className="flex items-center">
          <img width={50} className="mr-10" src={quizImage} alt="quiz" />
          <NavLink
            end
            to="/"
            onClick={reloadApp}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            className="inline-flex border-x px-10 py-5 transition-colors hover:bg-blue-400"
          >
            {' '}
            Quiz
          </NavLink>
          <NavLink
            to="/history"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            className="inline-flex border-r px-10 py-5 transition-colors hover:bg-blue-400"
          >
            {' '}
            История игр
          </NavLink>
          <NavLink
            to="/rules"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            className="inline-flex border-r px-10 py-5 transition-colors hover:bg-blue-400"
          >
            {' '}
            Правила
          </NavLink>
          <img width={50} className="ml-10" src={chooseImage} alt="choose" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
