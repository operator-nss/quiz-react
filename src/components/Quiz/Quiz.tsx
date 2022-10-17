import clsx from 'clsx';
import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  setQuestionNumber,
  setRightNumber,
  setSelectAnswer,
} from '../../redux/slices/QuestionSlice';
import Answer from '../Answer/Answer';
import { difficultArr } from '../DifficultPopup/DifficultPopup';

export interface question {
  answers: object;
  category: string;
  correct_answer?: string;
  correct_answers: object;
  description?: null | string;
  difficulty?: string;
  explanation?: null | any;
  id?: number;
  multiple_correct_answers: string;
  question: string;
  tip: any;
}

const Quiz: FC<question> = ({
  answers,
  category,
  correct_answer,
  correct_answers,
  description,
  difficulty,
  explanation,
  multiple_correct_answers,
  question,
  tip,
  id,
}) => {
  const { questionsItems, selectedAnswers, questionNumber } = useAppSelector(
    (state) => state.questions
  );
  const { categoryId } = useAppSelector((state) => state.filters);
  const [answered, setAnswered] = useState(false);
  const [rightAnswers, setRightAnswers] = useState<string[]>();
  const { difficultyQuiz } = useAppSelector((state) => state.filters);

  const dispatch = useAppDispatch();

  const nextQuestions = () => {
    if (!answered) {
      setAnswered(true);
    } else {
      const difference = rightAnswers?.filter((ar) => !selectedAnswers?.find((rm) => rm === ar));
      if (difference?.length === 0) {
        dispatch(setRightNumber());
      }
      setAnswered(false);
      dispatch(setSelectAnswer(''));
      dispatch(setQuestionNumber());
    }
  };

  const answersArray: string[] = Object.values(correct_answers);

  useEffect(() => {
    filterArray();
  }, [questionNumber, answers]);

  const filterArray = () => {
    const items: any = Object.entries(answers);
    const result: string[] = [];
    for (let i = 0; i <= items.length; i++) {
      if (answersArray[i] === 'true') {
        result.push(items[i][1]);
      }
    }
    setRightAnswers(result);
  };

  const multiQuestions = () => {
    return (
      <div>
        &apos;Выберите <span className="font-bold underline">несколько</span> вариантов ответа&apos;
      </div>
    );
  };

  return (
    <>
      <h2 className="mb-8 text-center text-2xl font-bold">
        {question}
        <div className="text-base">
          {category ? (
            <span className="font-normal">
              (категория{' '}
              <span
                className={clsx(
                  { 'text-red-500': categoryId === 0 },
                  { 'text-orange-500': categoryId === 1 },
                  { 'text-lime-500': categoryId === 2 },
                  { 'text-teal-500': categoryId === 3 },
                  { 'text-blue-500': categoryId === 4 },
                  { 'text-fuchsia-500': categoryId === 5 },
                  'font-bold underline'
                )}
              >
                {category}
              </span>
              ){' '}
            </span>
          ) : null}
          {difficultyQuiz !== 0 ? (
            <span className="font-normal">
              Сложность:{' '}
              <span
                className={clsx(
                  { 'text-red-500': difficultyQuiz === 3 },
                  { 'text-orange-500': difficultyQuiz === 2 },
                  { 'text-lime-500': difficultyQuiz === 1 },
                  'font-bold'
                )}
              >
                {difficultArr[difficultyQuiz].toUpperCase()}
              </span>
            </span>
          ) : null}
        </div>
      </h2>

      <h4 className="mb-8 text-center">
        {multiple_correct_answers === 'false' ? 'Выберите один ответ' : multiQuestions()}
      </h4>
      <ul className="mx-auto max-w-4xl">
        {Object.entries(answers)
          ?.filter((item: any) => item[1] !== null)
          ?.map((item: any, i: number) => {
            return (
              <Answer rightAnswers={rightAnswers} answered={answered} key={i} title={item[1]} />
            );
          })}
      </ul>

      {questionsItems.length > questionNumber - 1 ? (
        <button
          className="mx-auto mt-6 flex rounded border px-6 py-3 transition-colors hover:bg-emerald-500 hover:text-white"
          onClick={() => nextQuestions()}
        >
          {!answered ? 'Проверить' : 'Следующий вопрос'}
        </button>
      ) : null}
    </>
  );
};

export default Quiz;
