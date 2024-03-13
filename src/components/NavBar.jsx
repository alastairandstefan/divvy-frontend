import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

import { useState, useContext } from "react";

const NavBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  const logOutHandler = () => {
    setIsNavOpen((prev) => !prev)
    logOutUser();
  };

  return (
    <div className="flex items-center justify-between py-2 bg-gradient-to-r from-[#D5EFDF] to-[#F8EFD5]">
      <Link to="/dashboard" className="btn btn-ghost text-xl">
        D%VVY
      </Link>
      <nav>
        <section className="MOBILE-MENU flex lg:hidden">
          <div
            className="HAMBURGER-ICON space-y-2 pr-5"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="absolute top-4 right-5  "
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="flex flex-col  justify-between min-h-[180px]">
              <li className=" w-full ">
                {/* <a href="/about">About</a> */}

                <Link
                  to="/about"
                  className="btn btn-neutral text-xl w-full"
                  onClick={() => setIsNavOpen((prev) => !prev)}
                >
                  About
                </Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li className=" w-full ">
                    <Link
                      to="/dashboard"
                      className="btn btn-neutral text-xl w-full"
                      onClick={() => setIsNavOpen((prev) => !prev)}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className=" w-full ">
                    <Link
                      to="/dashboard"
                      className="btn btn-neutral text-xl w-full"
                      onClick={() => logOutHandler()}
                    >
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className=" w-full ">
                    <Link
                      to="/login"
                      className="btn btn-neutral text-xl w-full"
                      onClick={() => setIsNavOpen((prev) => !prev)}
                    >
                      Login
                    </Link>
                  </li>
                  <li className=" w-full ">
                    <Link
                      to="/Signup"
                      className="btn btn-neutral text-xl w-full"
                      onClick={() => setIsNavOpen((prev) => !prev)}
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </section>
        
        {/* DESKTOP MENU */}
        {isLoggedIn ? (
          <ul className="DESKTOP-MENU hidden space-x-8 lg:flex mr-5">
            <li>
              <Link
                to="/dashboard"
                className=" text-xl w-full"
                onClick={() => setIsNavOpen((prev) => !prev)}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className=" text-xl w-full"
                onClick={() => logOutHandler()}
              >
                Logout
              </Link>
            </li>
          </ul>
        ): (
          <ul className="DESKTOP-MENU hidden space-x-8 lg:flex mr-5">
          <li>
            <Link
              to="/about"
              className=" text-xl w-full"
              onClick={() => setIsNavOpen((prev) => !prev)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className=" text-xl w-full"
              onClick={() => setIsNavOpen((prev) => !prev)}
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/Signup"
              className=" text-xl w-full"
              onClick={() => setIsNavOpen((prev) => !prev)}
            >
              Sign Up
            </Link>
          </li>
        </ul>
        )}
        
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
    </div>
  );
};

export default NavBar;
