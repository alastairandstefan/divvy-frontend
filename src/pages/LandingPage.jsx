import { Link } from "react-router-dom";
import hero from "../../public/hero.png";

const LandingPage = () => {
  return (
    <div className="LANDING flex flex-col justify-between h-[93%] p-3 bg-appbg bg-gradient-to-t from-[#D5EFDF] via-[#FDEDD7] to-[#FFFBF0]">
      <div className="mt-20 flex flex-col items-center">
        <h1 className="font-bold text-3xl text-center">
          Split Expenses Effortlessly with Friends and Family
        </h1>
        <p className="text-center text-xl w-60 my-5">
          Never worry about who owes what again.
        </p>
      </div>
      <div className="flex flex-col items-center w-full ">
        <img
          src={hero}
          className="hero"
          alt="an illustration of a group of people being happy"
        />
        <div className="flex flex-col items-center w-full mb-36 ">
        
          <Link
            to="/signup"
            className="btn btn-md w-full btn-primary border-none uppercase"
          >
            Sign Up
          </Link>

          <Link
            to="/login"
            className="w-full btn-primary border-none  text-center mt-4"
          >
            Log in instead
          </Link>

        </div>
      </div>
    </div>
  );
};

export default LandingPage;
