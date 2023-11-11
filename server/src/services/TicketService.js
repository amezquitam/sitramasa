import pool from "../config/database.js"

const TicketService = {
    // get all tickets
    allTickets: async () => {
        const result = await pool.query(`select * from roles`)
        return result.rows
    }
}

export default TicketService
