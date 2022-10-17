import React from 'react';
import {Link} from 'react-router-dom';
import image404 from '../../assets/404.jpg'

const NoMatch = () => {
    return (
        <>
            <div className='container'>
                <img className='mx-auto my-10' src={image404} alt=""/>
            </div>
            <div className='text-center'>
                <Link to='/' className='mx-auto mt-6 inline-flex hover:bg-emerald-500 hover:text-white transition-colors rounded border px-6 py-3'
                >Вернуться на главную</Link>
            </div>

        </>

    );
};

export default NoMatch;