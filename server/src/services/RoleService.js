import pool from "../config/database.js"

const RoleService = {
    // get all posible roles
    allRoles: async () => {
        const result = await pool.query(`select * from roles`)
        return result.rows
    },
    get: async (id) => {
        const result = await pool.query(`select * from roles where role_id = $1`, [id])
        return result.rows[0]
    }
}

export default RoleService
