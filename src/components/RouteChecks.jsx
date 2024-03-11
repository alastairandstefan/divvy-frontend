import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate(`/`);
    }
  }, [isLoading, isLoggedIn, navigate]);

  if (isLoading) return <p>Loading ...</p>;

  return isLoggedIn ? children : null;
};

export const AnonymousRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      navigate(`/dashboard`);
    }
  }, [isLoading, isLoggedIn, navigate]);

  if (isLoading) return <p>Loading ...</p>;

  return isLoggedIn ? null : children;
};
