import { Link } from "react-router-dom";
import hero from "../../public/hero.png";

const LandingPage = () => {
  return (
    <div className="LANDING flex flex-col justify-evenly h-[92.5%] p-3 bg-appbg bg-gradient-to-t from-[#D5EFDF] via-[#FDEDD7] to-[#FFFBF0]">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-3xl text-center">
          Split Expenses Effortlessly with Friends and Family
        </h1>
        <p className="text-center text-xl w-60 mt-5">
          Never worry about who owes what again.
        </p>
      </div>
      <img
        src={hero}
        className="hero"
        alt="an illustration of a group of people being happy"
      />

      <Link
        to="/signup"
        className="btn btn-md w-full btn-primary border-none uppercase"
      >
        Sign Up
      </Link>

      <Link to="/login" className="w-full btn-primary border-none  text-center text-slate-00">
        Already have an account?
      </Link>
    </div>
  );
};

export default LandingPage;
