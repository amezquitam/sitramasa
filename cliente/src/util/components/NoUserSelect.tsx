import { useEffect } from "react"
import { ChildProp } from "../interfaces/ChildProp"

export const NoUserSelect = ({ children }: ChildProp) => {
    useEffect(() => {
        document.onselectstart = () => false
        return () => {
            document.onselectstart = null
        }
    }, [])
    return <>{children}</>
}