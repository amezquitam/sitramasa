import { createContext } from "react";
import { Dock } from "../interfaces/Dock";


export const DockContext = createContext<Dock[]>([])