
import { createContext } from 'react'
import { Role } from '../interfaces/Role'

export interface RoleContextType {
    roles: Role[]
}

export const RoleContext = createContext<RoleContextType>({} as RoleContextType)
