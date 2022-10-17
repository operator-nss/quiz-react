import React, {FC, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {getHistoryFromLocalStorage} from '../../actions/getHistoryFromLocalStorage';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {resetHistoryItems} from '../../redux/slices/HistorySlice';
import History from "./History";
import toni from '../../assets/toni.jpg'
import {setResetQuiz} from '../../redux/slices/QuestionSlice';
import {fetchQuestions} from '../../actions/asyncActions';

const HistoryContainer: FC = () => {
    const {historyItems} = useAppSelector(state => state.history);

    const dispatch = useAppDispatch();

    useEffect(() => {
        getHistoryFromLocalStorage();
    }, [])

    const resetLocalStorage = () => {
        dispatch(resetHistoryItems())
        dispatch(setResetQuiz())
        // dispatch(fetchQuestions())
        localStorage.removeItem('quiz');
    }

    return (
        <div className='container'>
            <div className='mt-10 border mx-auto max-w-5xl py-8 px-10 bg-white rounded-lg'>
                <h2 className='text-center text-2xl font-bold'>{historyItems?.length === 0 ? 'Истории игр нет' : 'История'}</h2>
                {historyItems?.map((item, i) => {
                    return <History
                        key={i}
                        date={item.date}
                        questions={item.questions}
                        rightAnswers={item.rightAnswers}
                    />
                })}
                <div className='text-center'>
                    {historyItems?.length ?
                        <Link to='/' onClick={resetLocalStorage}
                              className='mx-auto mt-6 inline-flex hover:bg-emerald-500
                     hover:text-white transition-colors rounded border px-6 py-3'>сброс</Link>
                        : <div className={'mt-10 font-bold text-2xl'}>
                            <div><img className='mx-auto' src={toni} alt=""/></div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default HistoryContainer;