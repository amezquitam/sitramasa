import pool from "../config/database.js"


const DockService = {
    allDocks: async () => {
        const { rows } = await pool.query(`select * from docks`)
        return rows
    },
}

export default DockService