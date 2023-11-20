import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ChildProp } from "../../util/interfaces/ChildProp";

export const RequireLogin = ({ children }: ChildProp) => {
    const { isAuthenticated } = useAuth();
    
    if (!isAuthenticated()) {
      return <Navigate to="/login" />
    }
  
    return <> { children } </>
  }
  