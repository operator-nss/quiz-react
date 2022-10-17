import React, {FC, useEffect, useRef, useState} from 'react';
import {fetchQuestions} from "../../actions/asyncActions";
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {categories} from "../Category/CategoryContainer";
import Progress from "../Progress/Progress";
import Quiz, {question} from "./Quiz";
import './quizContainer.css'
import bg01 from '../../assets/quiz/01.jpg'
import bg02 from '../../assets/quiz/02.jpg'
import bg03 from '../../assets/quiz/03.jpg'
import bg04 from '../../assets/quiz/04.jpg'
import bg05 from '../../assets/quiz/05.jpg'
import bg06 from '../../assets/quiz/06.jpg'
import bg07 from '../../assets/quiz/07.jpg'

const QuizContainer: FC = () => {
    const {questionsItems, rightAnswers, questionNumber} = useAppSelector(state => state.questions);
    const [questionVisible, setQuestionVisible] = useState<question | null>(null);
    const loading = useRef(false);
    const dispatch = useAppDispatch();
    const progressBar = questionNumber / questionsItems.length * 100 + '%';


    useEffect(() => {
        const renderItem = questionsItems[questionNumber];
        setQuestionVisible(renderItem)
    }, [questionNumber, questionsItems])

    return (
        <>
            <main className="container">
                <div className="mt-10 max-w-5xl relative mx-auto mt-10 border mx-auto max-w-5xl py-8 px-10 bg-white rounded-lg">
                    <div className='flex items-center mb-8'>
                        <div className='whitespace-nowrap'>{questionNumber} / {questionsItems.length}</div>
                        <Progress width={progressBar}/>
                        <div className='whitespace-nowrap'>Правильные ответы: <span>{rightAnswers}</span></div>
                    </div>
                    <img className='absolute animate__01 rounded-lg shadow top-10 -z-10 -right-40' src={bg01} alt=""/>
                    <img className='absolute animate__02 rounded-lg shadow top-10 -z-10 -left-60' src={bg02} alt=""/>
                    <img className='absolute animate__03 rounded-lg shadow bottom-10 -z-10 -left-40' src={bg03} alt=""/>
                    <img className='absolute animate__04 rounded-lg shadow bottom-10 -z-10 -right-60' src={bg04} alt=""/>
                    <img className='absolute animate__05 rounded-lg shadow top-1/2 -z-10 -left-60' src={bg05} alt=""/>
                    <img className='absolute animate__06 rounded-lg shadow top-1/3 -z-10 -right-60' src={bg06} alt=""/>
                    <img className='absolute animate__07 rounded-lg shadow top-10 -z-10 -left-60' src={bg07} alt=""/>


                    {questionVisible ? (
                        <div className='mx-auto'>
                            <Quiz
                                answers={questionVisible.answers}
                                category={questionVisible.category}
                                correct_answer={questionVisible.correct_answer}
                                correct_answers={questionVisible.correct_answers}
                                description={questionVisible.description}
                                difficulty={questionVisible.difficulty}
                                explanation={questionVisible.explanation}
                                multiple_correct_answers={questionVisible.multiple_correct_answers}
                                question={questionVisible.question}
                                tip={questionVisible.tip}
                            />
                        </div>

                    ) : null
                    }

                </div>

            </main>
        </>
    );
};

export default QuizContainer;