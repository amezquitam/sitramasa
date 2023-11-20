
import { createContext } from 'react'
import { AuthInfo } from '../interfaces/AuthInfo';

export type AuthInfoType = AuthInfo | null | boolean
export type SetAuthInfo = React.Dispatch<React.SetStateAction<AuthInfoType>>

export type AuthContextType = {
    authInfo: AuthInfoType | boolean,
    setAuthInfo: SetAuthInfo
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)
