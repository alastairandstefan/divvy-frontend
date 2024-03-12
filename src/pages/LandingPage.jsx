import { Link } from "react-router-dom";
import hero from "../../public/hero.png";

const LandingPage = () => {
    return(
        <div className="LANDING flex flex-col justify-between h-full p-3 bg-appbg bg-gradient-to-t from-[#D5EFDF] via-[#FDEDD7] to-[#FFFBF0]">
            <div className="mt-20 flex flex-col items-center">
                <h1 className="font-bold text-3xl text-center">Split Expenses Effortlessly with Friends and Family</h1>
                <p className="text-center text-xl w-60 my-5">Never worry about who owes what again.</p>
            </div>
            <div className="flex flex-col items-center w-full mb-24">
                <img src={hero} className="hero" alt="an illustration of a group of people being happy" />
                <Link to="/signup" className="btn btn-md w-full btn-primary border-none uppercase">Sign Up</Link>
            </div>
        </div>
    )
}

export default LandingPage;