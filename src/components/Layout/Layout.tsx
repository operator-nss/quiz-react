import React from 'react';
import { useAppSelector } from '../../hooks/hooks';
import CategoryContainer from '../Category/CategoryContainer';
import Preloader from '../Preloader/Preloader';
import QuizContainer from '../Quiz/QuizContainer';
import ResultQuiz from '../ResultQuiz/ResultQuiz';

const Layout = () => {
  const { questionsItems, restartQuiz, questionNumber } = useAppSelector(
    (state) => state.questions
  );

  const content =
    questionsItems.length && questionNumber !== 20 ? <QuizContainer /> : <ResultQuiz />;
  const loading = questionsItems.length ? content : <Preloader />;
  return <>{restartQuiz ? loading : <CategoryContainer />}</>;
};

export default Layout;
