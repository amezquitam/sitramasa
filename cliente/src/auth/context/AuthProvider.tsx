import { useEffect, useState } from 'react'
import { AuthContext, AuthInfoType } from "./AuthContext"
import { AuthInfo } from '../interfaces/AuthInfo'
import axios from 'axios'
import { ChildProp } from '../../util/interfaces/ChildProp'

export const AuthProvider = ({ children }: ChildProp) => {

    const [authInfo, setAuthInfo] = useState<AuthInfoType>(null)

    useEffect(() => {
        axios.get('/api/auth')
            .then(response => setAuthInfo(response.data as AuthInfo))
            .catch(() => setAuthInfo(false))
    }, [])

    return (
        <AuthContext.Provider value={{authInfo, setAuthInfo}}>
            {children}
        </AuthContext.Provider>
    )
}