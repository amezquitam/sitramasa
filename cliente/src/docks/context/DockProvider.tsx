import { useEffect, useState } from "react"
import { DockContext } from "./DockContext"
import axios from "axios"
import { Dock } from "../interfaces/Dock"
import { ChildProp } from "../../util/interfaces/ChildProp"

export const DockProvider = ({ children }: ChildProp) => {
    const [docks, setDocks] = useState<Dock[]>([])

    useEffect(() => {
        axios.get('/api/dock')
            .then(res => setDocks(res.data))
            .catch(console.error)
    }, [])

    return (
        <DockContext.Provider value={docks}>
            {children}
        </DockContext.Provider>
    )
}