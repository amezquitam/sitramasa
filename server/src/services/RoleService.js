import pool from "../config/database.js"

const RoleService = {
    // get all posible roles
    allRoles: async () => {
        const { rows } = await pool.query(`select * from roles`)
        return rows
    },
    get: async (id) => {
        const { rows } = await pool.query(`select * from roles where "roleId" = $1`, [id])
        return rows[0]
    }
}

export default RoleService
