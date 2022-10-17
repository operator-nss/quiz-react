import React, { FC } from 'react';
import { historyItem } from '../../redux/slices/HistorySlice';

const History: FC<historyItem> = ({ date, questions, rightAnswers }) => (
    <div className="mx-auto mt-5 max-w-xl rounded-lg border px-3 py-5 md:mt-10 md:px-6">
      <div className="mb-5 flex items-center justify-between">
        <div>Дата</div>
        <div>{date}</div>
      </div>
      <div className="mb-5 flex items-center justify-between">
        <div>Количество вопросов</div>
        <div>{questions}</div>
      </div>
      <div className="flex items-center justify-between">
        <div>Правильных ответов</div>
        <div>{rightAnswers}</div>
      </div>
    </div>
  );

export default History;
