import spinner from '../../assets/spinner.svg';

const Preloader = () => {
    return (
        <div className='text-center fixed top-1/2 left-1/2 -translate-x-1/2	-translate-y-1/2	'><img className='mx-auto' src={spinner} alt=""/></div>
    );
};

export default Preloader;