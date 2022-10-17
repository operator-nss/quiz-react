import clsx from 'clsx';
import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {setDifficult} from '../../redux/slices/FilterSlice';
import './difficultPopup.css'

type DifficultPopupProps = {
    setOpenPopup: any,
    setIsDifficultChoose: any,
    isDifficultChoose: boolean
}

export const difficultArr = ['random', 'easy', 'medium', 'hard'];

const DifficultPopup: FC<DifficultPopupProps> = ({setOpenPopup, setIsDifficultChoose, isDifficultChoose}) => {

    const dispatch = useAppDispatch();
    const {difficultyQuiz} = useAppSelector(state => state.filters);

    const chooseDifficult = (id: number) => {
        setOpenPopup(false);
        dispatch(setDifficult(id))
        setIsDifficultChoose(true)
    }

    return (
        <div

            className='rouned-lg popup-visible divide-y overflow-hidden divide-slate-100 rounded bg-white shadow absolute left-1/2 -translate-x-1/2 top-16 mx-auto border'>
            {difficultArr.map((item, i) => {
                return <button
                    key={i}
                    onClick={() => chooseDifficult(i)}
                    className={clsx(
                        {'hidden': i === difficultyQuiz && isDifficultChoose},
                        {'hover:bg-blue-400 hover:text-white': i === 0},
                        {'hover:bg-lime-400 hover:text-white': i === 1},
                        {'hover:bg-yellow-400 hover:text-white': i === 2},
                        {'hover:bg-red-500 hover:text-white': i === 3},
                        'py-4 px-28 flex w-full transition-colors items-center justify-center')}>{item.toUpperCase()}</button>
            })}
        </div>
    );
};

export default DifficultPopup;