import axios from "axios"
import { useContext } from 'react'
import { AuthInfo } from "../interfaces/AuthInfo"
import { AuthContext } from "../context/AuthContext"

export type LoginPayload = {
    username: string
    password: string
}

export type SignUpPayload = {
    role: string
    firstname: string
    lastname: string
    username: string
    password: string
}

export const useAuth = () => {
    const { setAuthInfo, authInfo } = useContext(AuthContext)

    const isChecking = () => authInfo === null;

    const isAuthenticated = () => authInfo !== null && authInfo !== false;

    const login = async (credentials: LoginPayload) => {
        const response = await axios.post('api/auth', credentials);
        const authInfo = response.data as AuthInfo;
        setAuthInfo(authInfo)
        return authInfo;
    }

    const signUp = async (credentials: SignUpPayload) => {
        console.log(credentials);
        
        const response = await axios.post('/api/user', credentials);
        if (response.status === 400) return
        return await login({ ...credentials })
    }

    const logout = async () => {
        await axios.get('/api/logout');
        setAuthInfo(null)
    }

    return {
        isChecking,
        isAuthenticated,
        login,
        logout,
        signUp,
        authInfo: authInfo as AuthInfo
    }
}