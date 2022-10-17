import React, {FC} from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import {fetchQuestions} from "../../actions/asyncActions";
import {useAppDispatch} from '../../hooks/hooks';
import {setDifficult} from "../../redux/slices/FilterSlice";
import {setResetQuiz} from "../../redux/slices/QuestionSlice";
import quizImage from '../../assets/quiz.png'
import chooseImage from '../../assets/choose.png'

const Navbar: FC = () => {
    let dispatch: any;
    dispatch = useAppDispatch();
    const {pathname} = useLocation();


    let activeStyle = {
        color: '#fff',
        background: '#1E88E5',
    }

    const reloadApp = () => {
        if (pathname !== '/') {
            dispatch(setResetQuiz())
            dispatch(setDifficult(0))
        }
    }

    return (
        <header className='bg-blue-300 w-screen'>
            <div className="container">
                <div className='flex items-center'>
                    <img width={50} className='mr-10' src={quizImage} alt="quiz"/>
                    <NavLink end to='/' onClick={reloadApp} style={({isActive}) => isActive ? activeStyle : undefined}
                             className="px-10 py-5 border-x border-l inline-flex hover:bg-blue-400 transition-colors"> Quiz</NavLink>
                    <NavLink to='/history' style={({isActive}) => isActive ? activeStyle : undefined}
                             className="px-10 py-5 border-r inline-flex hover:bg-blue-400 transition-colors"> История игр</NavLink>
                    <NavLink to='/rules' style={({isActive}) => isActive ? activeStyle : undefined}
                             className="px-10 py-5 border-r inline-flex hover:bg-blue-400 transition-colors"> Правила</NavLink>
                    <img width={50} className='ml-10' src={chooseImage} alt="choose"/>
                </div>

            </div>

        </header>
    );
};

export default Navbar;