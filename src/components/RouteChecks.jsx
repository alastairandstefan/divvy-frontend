import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export const PrivateRoute = ({children}) => {

    const { isLoggedIn, isLoading } = useContext(AuthContext);

    // If the authentication is still loading 
    if (isLoading) return <p>Loading ...</p>;
  
    if (!isLoggedIn) {
    // If the user is not logged in 
      return <Navigate to="/" />;
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
      return <Navigate to="/dashboard" />;
    } else {
    // If the user is logged in, allow to see the page 
      return children;
    }

}