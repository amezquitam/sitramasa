import {useContext} from 'react'
import { RoleContext } from '../context/RoleContext'

export const useRoles = () =>{
    const { roles } = useContext(RoleContext)
    return roles;
}
