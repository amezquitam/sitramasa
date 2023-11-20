import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ChildProp } from "../../util/interfaces/ChildProp";


export const NoRequireLogin = ({ children }: ChildProp) => {
    const { isAuthenticated } = useAuth();
    
    if (!isAuthenticated()) {
        return <> { children } </>
    }

    return <Navigate to="/" />
}
