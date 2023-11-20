import { Role } from "../interfaces/Role"
import { RoleContext } from "./RoleContext"
import { useState, useEffect } from 'react'
import { ChildProp } from "../../util/interfaces/ChildProp"
import axios from "axios"

export const RoleProvider = ({ children }: ChildProp) => {
    const [roles, setRoles] = useState<Role[]>([])

    useEffect(() => {
        axios.get('/api/role')
            .then(response => setRoles(response.data))
            .catch(console.error)
    }, [])

    return (
        <RoleContext.Provider value={{ roles }}>
            {children}
        </RoleContext.Provider>
    )
}