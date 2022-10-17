import React, {FC, useEffect} from 'react';
import {getHistoryFromLocalStorage} from '../../actions/getHistoryFromLocalStorage';
import {historyItem} from '../../redux/slices/HistorySlice';


const History: FC<historyItem> = ({
                                      date,
                                      questions,
                                      rightAnswers
                                  }) => {


    return (
        <div className='mt-10 max-w-xl mx-auto border px-6 py-5 rounded-lg'>
            <div className='flex justify-between items-center mb-5'>
                <div>Дата</div>
                <div>{date}</div>
            </div>
            <div className='flex justify-between items-center mb-5'>
                <div>Количество вопросов</div>
                <div>{questions}</div>
            </div>
            <div className='flex justify-between items-center'>
                <div>Правильных ответов</div>
                <div>{rightAnswers}</div>
            </div>
        </div>
    );
};

export default History;