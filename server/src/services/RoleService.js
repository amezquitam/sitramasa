import pool from "../config/database.js"

const RoleService = {
    // get all posible roles
    allRoles: async () => {
        const result = await pool.query(`select * from roles`)
        return result.rows
    }
}

export default RoleService
