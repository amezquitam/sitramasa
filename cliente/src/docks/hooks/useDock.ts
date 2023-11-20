import { useContext } from "react"
import { DockContext } from "../context/DockContext"

export const useDock = () => {
    const docks = useContext(DockContext)
    return docks
}