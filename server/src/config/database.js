import pg from "pg";

const pool = new pg.Pool({
    user: process.env.dbUser,
    host: process.env.dbHost,
    database: process.env.dbDatabase,
    password: process.env.dbPassword,
    port: process.env.dbPort,
})

export default pool