import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {fetchQuestions} from "../../actions/asyncActions";
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {CategoryPropertyEnum, setCategory} from '../../redux/slices/FilterSlice';
import {setRestartQuiz} from '../../redux/slices/QuestionSlice';
import arrow from '../../assets/chevron.svg'
import DifficultPopup, {difficultArr} from '../DifficultPopup/DifficultPopup';
import clsx from 'clsx';
import './category.css';


type categories = {
    name: string,
    category: string
}

export const categories: categories[] = [
    {name: 'Random', category: CategoryPropertyEnum.ALL},
    {name: 'Linux', category: CategoryPropertyEnum.LINUX},
    {name: 'DevOps', category: CategoryPropertyEnum.DEVOPS},
    {name: 'Docker', category: CategoryPropertyEnum.DOCKER},
    {name: 'Sql', category: CategoryPropertyEnum.SQL},
    {name: 'Cms', category: CategoryPropertyEnum.CMS},
]


const CategoryContainer: FC = () => {
    const dispatch = useAppDispatch();
    const [openPopup, setOpenPopup] = useState(false);
    const [isDifficultChoose, setIsDifficultChoose] = useState(false);
    const {difficultyQuiz} = useAppSelector(state => state.filters);
    const popupRef = useRef<HTMLDivElement>(null);


    const setCategoryId = useCallback((id: number) => {
        dispatch(setCategory(id));
        let categorie = categories[id].name.toLowerCase();
        let category = '';
        if (categorie !== 'random') {
            category = '?category=' + categorie
        }
        let difficulty = '';
        if (difficultyQuiz !== 0) {
            difficulty = '&difficulty=' + difficultArr[difficultyQuiz]
        }
        dispatch(fetchQuestions({category, difficulty}));
        dispatch(setRestartQuiz());

    }, [difficultyQuiz])

    const setPopup = () => {
        setOpenPopup(!openPopup)
    }

    useEffect(() => {
        const handleClickOutside = (e : MouseEvent) => {
            const _event = e as MouseEvent & {
                path: Node[];
            };
            if(popupRef.current && !_event.path.includes(popupRef.current)) {
                setOpenPopup(false);
            }
        }
        document.body.addEventListener('click',handleClickOutside);
        return  () => {
            document.body.removeEventListener('click', handleClickOutside);
        }
    }, [])

    return (
        <div className='container'>
            <div className='mt-10 border mx-auto max-w-5xl pt-8 pb-12 px-10 bg-white rounded-lg'>
                <h2 className='text-center mb-10 text-2xl font-bold'>Выберите категорию</h2>
                <div className='grid gap-8 grid-cols-3'>
                    {categories?.map((item: categories, i: number) => {
                        return <button key={i} onClick={() => setCategoryId(i)}
                                       className='category-button bg-emerald-300 text-white rounded border px-6 py-3'>
                            <span className='z-10 relative'>{item.name}</span></button>
                    })}

                </div>

                <div className='text-center flex justify-center mt-8'>
                    <div ref={popupRef} className='relative'>
                        {<button
                            onClick={setPopup}
                            className={clsx({'active-difficult':openPopup},'border difficult px-16 hover:bg-blue-300 transition-colors rounded py-4 flex gap-x-10 mx-auto items-center justify-between')}
                        >
                            <span className='relative z-10'>{isDifficultChoose ? difficultArr[difficultyQuiz].toUpperCase() : 'Выберите сложность'}</span>
                            <img src={arrow} className={clsx({'rotate-180': openPopup}, 'transition')} alt=""/>
                        </button>}
                        {openPopup && <DifficultPopup
							            setOpenPopup={setOpenPopup}
							            setIsDifficultChoose={setIsDifficultChoose}
							            isDifficultChoose={isDifficultChoose}
						            />}
                    </div>
                </div>
            </div>


        </div>
    );
};

export default CategoryContainer;
