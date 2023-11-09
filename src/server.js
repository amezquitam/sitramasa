import dotenv from 'dotenv'
import express from 'express'

import router from './router.js'

// Read dotenv variables and store it in process.env
dotenv.config()

// In this module we need know the host and port where run the server
const { appPort, appHost} = process.env

// Express server instance
const server = express()

// API routes configuration
server.use('/api', router)

server.listen(appPort)
console.log(`Server is running at: http://${appHost}:${appPort}`)
