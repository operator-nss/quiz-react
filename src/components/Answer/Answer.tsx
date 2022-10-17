import clsx from 'clsx';
import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setSelectAnswer } from '../../redux/slices/QuestionSlice';
import IconArrow from '../IconArrow/IconArrow';
import IconWrong from '../IconWrong/IconWrong';

type AnswerProps = {
  title: string;
  answered: boolean;
  rightAnswers: string[] | undefined;
};

const Answer: FC<AnswerProps> = ({ title, rightAnswers, answered }) => {
  const [selected, setSelected] = useState<boolean>(false);
  const [wrongIcon, setWrongIcon] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { selectedAnswers } = useAppSelector((state) => state.questions);
  const findItem = rightAnswers?.find((item) => item === title);

  const selectAnswer = () => {
    setSelected(!selected);
    dispatch(setSelectAnswer(title));
  };

  useEffect(() => {
    if (!answered) {
      setSelected(false);
      setWrongIcon(false);
    } else {
      const findWrongItem = selectedAnswers?.find((item) => item === title);
      const difference = rightAnswers?.filter((ar) => !selectedAnswers?.find((rm) => rm === ar));
      if (difference?.length !== 0 && findWrongItem) {
        setWrongIcon(true);
      }
    }
  }, [answered]);

  return (
    <li>
      <button
        disabled={answered}
        onClick={() => selectAnswer()}
        className={clsx(
          { '!hover:none': answered },
          { '!bg-red-600': wrongIcon },
          { 'bg-orange-500 text-white': selected },
          { 'animate !bg-emerald-700 text-white': findItem && answered },
          ' mb-4 flex h-14 w-full items-center justify-between rounded-lg border px-6 py-4 text-left transition-colors enabled:hover:bg-purple-500 enabled:hover:text-white'
        )}
      >
        {title}
        {selected && !wrongIcon && <IconArrow />}
        {selected && wrongIcon && <IconWrong />}
        {}
      </button>
    </li>
  );
};

export default Answer;
