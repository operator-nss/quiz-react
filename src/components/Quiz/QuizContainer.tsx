import React, { FC, useEffect, useState } from 'react';
import bg01 from '../../assets/quiz/01.jpg';
import bg02 from '../../assets/quiz/02.jpg';
import bg03 from '../../assets/quiz/03.jpg';
import bg04 from '../../assets/quiz/04.jpg';
import bg05 from '../../assets/quiz/05.jpg';
import bg06 from '../../assets/quiz/06.jpg';
import bg07 from '../../assets/quiz/07.jpg';
import { useAppSelector } from '../../hooks/hooks';
import Progress from '../Progress/Progress';
import Quiz, { question } from './Quiz';
import './quizContainer.css';

const QuizContainer: FC = () => {
  const { questionsItems, rightAnswers, questionNumber } = useAppSelector(
    (state) => state.questions
  );
  const [questionVisible, setQuestionVisible] = useState<question | null>(null);
  const progressBar = `${(questionNumber / questionsItems.length) * 100}%`;

  useEffect(() => {
    const renderItem = questionsItems[questionNumber];
    setQuestionVisible(renderItem);
  }, [questionNumber, questionsItems]);

  return (
    <>
      <main className="container">
        <div className="relative mx-auto mt-10 max-w-5xl rounded-lg border bg-white py-8 px-10">
          <div className="mb-8 flex items-center">
            <div className="whitespace-nowrap">
              {questionNumber} / {questionsItems.length}
            </div>
            <Progress width={progressBar} />
            <div className="whitespace-nowrap">
              Правильные ответы: <span>{rightAnswers}</span>
            </div>
          </div>
          <img
            className="animate__01 absolute top-10 -right-40 -z-10 rounded-lg shadow"
            src={bg01}
            alt=""
          />
          <img
            className="animate__02 absolute top-10 -left-60 -z-10 rounded-lg shadow"
            src={bg02}
            alt=""
          />
          <img
            className="animate__03 absolute bottom-10 -left-40 -z-10 rounded-lg shadow"
            src={bg03}
            alt=""
          />
          <img
            className="animate__04 absolute bottom-10 -right-60 -z-10 rounded-lg shadow"
            src={bg04}
            alt=""
          />
          <img
            className="animate__05 absolute top-1/2 -left-60 -z-10 rounded-lg shadow"
            src={bg05}
            alt=""
          />
          <img
            className="animate__06 absolute top-1/3 -right-60 -z-10 rounded-lg shadow"
            src={bg06}
            alt=""
          />
          <img
            className="animate__07 absolute top-10 -left-60 -z-10 rounded-lg shadow"
            src={bg07}
            alt=""
          />

          {questionVisible ? (
            <div className="mx-auto">
              <Quiz
                answers={questionVisible.answers}
                category={questionVisible.category}
                correct_answer={questionVisible.correct_answer}
                correct_answers={questionVisible.correct_answers}
                description={questionVisible.description}
                difficulty={questionVisible.difficulty}
                explanation={questionVisible.explanation}
                multiple_correct_answers={questionVisible.multiple_correct_answers}
                question={questionVisible.question}
                tip={questionVisible.tip}
              />
            </div>
          ) : null}
        </div>
      </main>
    </>
  );
};

export default QuizContainer;
