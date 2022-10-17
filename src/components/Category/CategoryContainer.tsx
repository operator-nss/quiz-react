import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import {fetchQuestions} from '../../actions/asyncActions';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {CategoryPropertyEnum, setCategory} from '../../redux/slices/FilterSlice';
import {setRestartQuiz} from '../../redux/slices/QuestionSlice';
import arrow from '../../assets/chevron.svg';
import DifficultPopup, {difficultArr} from '../DifficultPopup/DifficultPopup';
import './category.css';

type categoriesType = {
  name: string;
  category: string;
};

export const categories: categoriesType[] = [
  {name: 'Random', category: CategoryPropertyEnum.ALL},
  {name: 'Linux', category: CategoryPropertyEnum.LINUX},
  {name: 'DevOps', category: CategoryPropertyEnum.DEVOPS},
  {name: 'Docker', category: CategoryPropertyEnum.DOCKER},
  {name: 'Sql', category: CategoryPropertyEnum.SQL},
  {name: 'Cms', category: CategoryPropertyEnum.CMS},
];

const CategoryContainer: FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const [isDifficultChoose, setIsDifficultChoose] = useState(false);
  const {difficultyQuiz} = useAppSelector((state) => state.filters);
  const popupRef = useRef<HTMLDivElement>(null);

  const setCategoryId = useCallback(
    (id: number) => {
      dispatch(setCategory(id));
      const categorie = categories[id].name.toLowerCase();
      let category = '?category=';
      if (categorie !== 'random') {
        category = `?category=${categorie}`;
      }
      let difficulty = '';
      if (difficultyQuiz !== 0) {
        difficulty = `&difficulty=${difficultArr[difficultyQuiz]}`;
      }
      dispatch(fetchQuestions({category, difficulty}));
      dispatch(setRestartQuiz());
    },
    [difficultyQuiz]
  );

  const setPopup = useCallback(() => {
    setOpenPopup(!openPopup);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const event = e as MouseEvent & {
        path: Node[];
      };
      if (popupRef.current && !event.path.includes(popupRef.current)) {
        setOpenPopup(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="container">
      <div className="mx-auto mt-10 max-w-5xl rounded-lg border bg-white px-5 pt-8 pb-12 md:px-10">
        <h2 className="mb-5 text-center text-2xl font-bold md:mb-10">Выберите категорию</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {categories?.map((item: categoriesType, i: number) => (
            <button
              key={i}
              onClick={() => setCategoryId(i)}
              className="category-button rounded border bg-emerald-300 px-6 py-3 text-white"
            >
              <span className="relative z-10">{item.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-center text-center">
          <div ref={popupRef} className="relative">
            <button
              onClick={setPopup}
              className={clsx(
                {'active-difficult': openPopup},
                'difficult mx-auto flex items-center justify-between gap-x-5 rounded border px-6 py-4 transition-colors hover:bg-blue-300 md:gap-x-10 md:px-16'
              )}
            >
                <span className="relative z-10">
                  {isDifficultChoose
                    ? difficultArr[difficultyQuiz].toUpperCase()
                    : 'Выберите сложность'}
                </span>
              <img
                src={arrow}
                className={clsx({'rotate-180': openPopup}, 'transition')}
                alt=""
              />
            </button>
            {openPopup && (
              <DifficultPopup
                setOpenPopup={setOpenPopup}
                setIsDifficultChoose={setIsDifficultChoose}
                isDifficultChoose={isDifficultChoose}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default CategoryContainer;
