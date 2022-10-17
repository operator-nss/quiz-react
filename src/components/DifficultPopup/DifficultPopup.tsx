import clsx from 'clsx';
import {FC} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {setDifficult} from '../../redux/slices/FilterSlice';

type DifficultPopupProps = {
  setOpenPopup: any;
  setIsDifficultChoose: any;
  isDifficultChoose: boolean;
};

export const difficultArr = ['random', 'easy', 'medium', 'hard'];

const DifficultPopup: FC<DifficultPopupProps> = ({
  setOpenPopup,
  setIsDifficultChoose,
  isDifficultChoose,
}) => {
  const dispatch = useAppDispatch();
  const { difficultyQuiz } = useAppSelector((state) => state.filters);

  const chooseDifficult = (id: number) => {
    setOpenPopup(false);
    dispatch(setDifficult(id));
    setIsDifficultChoose(true);
  };

  return (
    <div className="rounded-lg popup-visible absolute left-1/2 top-16 mx-auto -translate-x-1/2 divide-y divide-slate-100 overflow-hidden rounded border bg-white shadow">
      {difficultArr?.map((item, i) => {
        return (
          <button
            key={i}
            onClick={() => chooseDifficult(i)}
            className={clsx(
              { hidden: i === difficultyQuiz && isDifficultChoose },
              { 'hover:bg-blue-400 hover:text-white': i === 0 },
              { 'hover:bg-lime-400 hover:text-white': i === 1 },
              { 'hover:bg-yellow-400 hover:text-white': i === 2 },
              { 'hover:bg-red-500 hover:text-white': i === 3 },
              'flex w-full items-center justify-center py-4 px-28 transition-colors'
            )}
          >
            {item.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
};

export default DifficultPopup;
