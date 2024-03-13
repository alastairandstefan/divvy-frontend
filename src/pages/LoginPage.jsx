import axios from "axios";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useMutation } from "react-query"; // This approach provides benefits like automatic retries, error handling, and status tracking.
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const loginMutation = async ({ email, password }) => {
  const { data } = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  return data;
};

// toast
const notify = ( message) => {
  toast.warning(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  // const [loggedInUser, setLoggedInUser] = useState({});

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const mutation = useMutation(loginMutation, {
    onSuccess: (data) => {
      // console.log(data);
      // console.log("JWT token", data.authToken);
      storeToken(data.authToken);
      authenticateUser();
      // navigate("/dashboard");
    },
    onError: (error) => {
      const errorDescription = error.response.data.message;
      // setErrorMessage(errorDescription);
      notify(errorDescription);
    },
  });

  const loginHandler = (e) => {
    e.preventDefault();

    mutation.mutate({ email, password });
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
  };

  return (
    <div className="relative flex flex-col w-full h-[92.5%]">
        <h3 className="text-2xl my-10 sm:w-80 text-center">Login to D%VVY</h3>
        <form className="flex flex-col justify-center items-center">
          <label className="input input-bordered flex items-center gap-2 w-full max-w-80 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow "
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 w-full max-w-80 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              placeholder="Password"
              className="grow"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            // type="submit"
            className="btn btn-primary  bottom-3 mt-5 w-full max-w-80"
            onClick={loginHandler}
          >
            Login
          </button>
      
        </form>
        {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}
      
      {/* log user out */}
    </div>
  );
};

export default LoginPage;
