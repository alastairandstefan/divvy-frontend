import axios from "axios";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useMutation } from 'react-query'; // This approach provides benefits like automatic retries, error handling, and status tracking.


const API_URL = import.meta.env.VITE_API_URL;

const loginMutation = async ({ email, password }) => {
  const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });
  return data;
 };

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  
  const navigate = useNavigate();

  const {storeToken, authenticateUser} = useContext(AuthContext);

  const mutation = useMutation(loginMutation, {
    onSuccess: (data) => {
      console.log(data);
      console.log("JWT token", data.authToken);
      storeToken(data.authToken);
      authenticateUser();
      navigate("/dashboard");
    },
    onError: (error) => {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    },
 });


  const loginClick = (e) => {
    e.preventDefault();

    mutation.mutate({ email, password });
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
