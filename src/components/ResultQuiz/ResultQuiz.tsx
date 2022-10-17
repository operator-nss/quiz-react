import React, {FC, useEffect, useRef} from 'react';
import {getHistoryFromLocalStorage} from "../../actions/getHistoryFromLocalStorage";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {setDifficult} from "../../redux/slices/FilterSlice";
import {setHistoryItems} from '../../redux/slices/HistorySlice';
import {setResetQuiz} from '../../redux/slices/QuestionSlice';

const ResultQuiz: FC = () => {

    const {questionsItems, rightAnswers} = useAppSelector(state => state.questions);
    const {historyItems} = useAppSelector(state => state.history);
    const dispatch = useAppDispatch();
    const isMounted = useRef(false);

    const resetQuiz = () => {
        dispatch(setResetQuiz());
        dispatch(setDifficult(0))
    }

    function setMonth(month: number) {
        return month < 10 ? '0' + month : month;
    }

    function setMinutes(minutes: number) {
        return minutes < 10 ? '0' + minutes : minutes;
    }

    function setDays(day: number) {
        return day < 10 ? '0' + day : day;
    }

    useEffect(() => {
        if (!isMounted.current) {
            const date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let hour = date.getHours();
            let minutes = date.getMinutes();
            let time = `${setDays(day)}.${setMonth(month)}.${year} ${hour}:${setMinutes(minutes)}`
            const result = {
                date: time,
                rightAnswers,
                questions: questionsItems.length
            }
            localStorage.setItem('quiz', JSON.stringify([...historyItems, result]));
            getHistoryFromLocalStorage();
            dispatch(setHistoryItems(result))
            isMounted.current = true;
        }

    }, [])

    return (
        <div className='container'>
            <div className='mt-10 border mx-auto max-w-5xl py-8 px-10 bg-white rounded-lg'>
                <h1 className='text-center font-bold text-3xl'>Quiz закончен</h1>
                <div className='max-w-xl mt-10 mx-auto'>
                    <div className='flex mb-4 items-center justify-between'>
                        <div>Всего вопросов :</div>
                        <div>{questionsItems.length}</div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div>Правильных ответов :</div>
                        <div>{rightAnswers}</div>
                    </div>
                    <button
                        onClick={resetQuiz}
                        className='mx-auto mt-6 flex hover:bg-emerald-500 hover:text-white transition-colors rounded border px-6 py-3'>Начать
                        заново
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResultQuiz;