import { LoadingPage } from "../../util/components/LoadingPage";
import { ChildProp } from "../../util/interfaces/ChildProp";
import { useAuth } from "../hooks/useAuth";


export const LoadingLogin = ({ children }: ChildProp) => {
    const { isChecking } = useAuth();

    if (isChecking()) {
        return <LoadingPage />
    }

    return <> {children} </>
}