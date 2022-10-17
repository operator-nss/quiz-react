import spinner from '../../assets/spinner.svg';

const Preloader = () => (
  <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2	text-center	">
    <img className="mx-auto" src={spinner} alt="" />
  </div>
);

export default Preloader;
