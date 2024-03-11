import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

export const PrivateRoute = ({children}) => {

    const navigate = useNavigate();

    const { isLoggedIn, isLoading } = useContext(AuthContext);

    // If the authentication is still loading 
    if (isLoading) return <p>Loading ...</p>;
  
    if (!isLoggedIn) {
    // If the user is not logged in 
      return navigate(`/`);
    } else {
    // If the user is logged in, allow to see the page 
      return children;
    }

}

export const AnonymousRoute = ({children}) => {

    const { isLoggedIn, isLoading } = useContext(AuthContext);

    // If the authentication is still loading 
    if (isLoading) return <p>Loading ...</p>;
  
    if (isLoggedIn) {
    // If the user is not logged in 
      return navigate(`/dashboard`);
    } else {
    // If the user is logged in, allow to see the page 
      return children;
    }

}