import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  // If the authentication is still loading
  if (isLoading) return <p>Loading ...</p>;

  if (!isLoggedIn) {
    // If the user is not logged in (redirect to landing page)
    navigate(`/`);
  } else {
    // If the user is logged in, allow to see the page
    return children;
  }
};

export const AnonymousRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  // If the authentication is still loading
  if (isLoading) return <p>Loading ...</p>;

  if (isLoggedIn) {
    // If the user is logged in
    navigate(`/dashboard`);
  } else {
    // If the user is not logged in, allow to see the page (signup/login)
    return children;
  }
};
