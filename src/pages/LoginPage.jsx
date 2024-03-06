import axios from "axios";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;

const LoginPage = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);
  
  const navigate = useNavigate();

  const {storeToken, authenticateUser} = useContext(AuthContext);

  const loginClick = (e) => {
    e.preventDefault();

    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((res) => {
        console.log("JWT token", res.data.authToken);

        storeToken(res.data.authToken);
        authenticateUser();
        navigate("/dashboard");
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <h3 className="">Login</h3>
      <form className="flex flex-col justify-center items-center">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded p-2 mb--6"
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded p-2 mb--6"
        />
        <button
          // type="submit"
          className="btn btn-neutral"
          onClick={loginClick}
        >
          Log In
        </button>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }
    </div>
  );
};

export default LoginPage;
