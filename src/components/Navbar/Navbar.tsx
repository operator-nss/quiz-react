import React, {FC} from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import chooseImage from '../../assets/choose.png';
import quizImage from '../../assets/quiz.png';
import {useAppDispatch} from '../../hooks/hooks';
import {setDifficult} from '../../redux/slices/FilterSlice';
import {setResetQuiz} from '../../redux/slices/QuestionSlice';

const Navbar: FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const {pathname} = useLocation();

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
          <img width={50} className="hidden mr-10 md:block" src={quizImage} alt="quiz"/>
          <NavLink
            end
            to="/"
            onClick={reloadApp}
            style={({isActive}) => (isActive ? activeStyle : undefined)}
            className="inline-flex border-x px-2 py-3 transition-colors hover:bg-blue-400 sm:px-5 md:px-10 md:py-5"
          >
            {' '}
            Quiz
          </NavLink>
          <NavLink
            to="/history"
            style={({isActive}) => (isActive ? activeStyle : undefined)}
            className="inline-flex border-r px-2 py-3 transition-colors hover:bg-blue-400 sm:px-5 md:px-10 md:py-5"
          >
            {' '}
            История игр
          </NavLink>
          <NavLink
            to="/rules"
            style={({isActive}) => (isActive ? activeStyle : undefined)}
            className="inline-flex border-r px-2 py-3 transition-colors hover:bg-blue-400 sm:px-5 md:px-10 md:py-5"
          >
            {' '}
            Правила
          </NavLink>
          <img width={50} className="ml-10 hidden md:block" src={chooseImage} alt="choose"/>
        </div>
      </div>
    </header>
  );
});

export default Navbar;
