import pool from "../config/database.js"

/**
 * A set of functions for manage users
 */
const UserService = {
    /**
     * @returns A user with the specified id or null
     * if not exists
     */
    get: async (userId) => {
        const query = `
            select * 
            from users 
            where userId = $1
        `
        const values = [userId]

        const result = await pool.query(query, values)

        return result.rowCount === 1 ? result.rows[0] : null
    },

    /**
     * @returns A user with the specified id or null
     * if not exists
     */
    getByUsername: async (username) => {
        const query = `
            select * 
            from users 
            where username = $1
        `
        const values = [username]

        const result = await pool.query(query, values)

        return result.rowCount === 1 ? result.rows[0] : null
    },

    /**
     * 
     * @param Object: An object with properties to create an user:
     * - firstname: string
     * - lastname: string
     * - username: string
     * - password: string
     * - roleId: integer
     * @returns true if user was created and saved
     */
    create: async ({ firstname, lastname, username, password, roleId }) => {

        const query = `insert into users (firstname, lastname, username, password, "roleId")
            values ($1, $2, $3, $4, $5)`
        const values = [firstname, lastname, username, password, roleId]

        try {
            await pool.query(query, values)
        } catch (err) {
            console.error(err)
            return false
        }

        return true
    }
}

export default UserService