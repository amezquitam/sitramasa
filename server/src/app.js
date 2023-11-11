// external
import express from 'express'
import cors from 'cors'
// internal
import './config/dotenv.js'
import router from './controllers/Controller.js'

// Read dotenv variables and store it in process.env

// In this module we need know the host and port where run the server
const { appPort, appHost} = process.env

// Express server instance
const server = express()

server.use(cors({
    origin: 'http://localhost:5173'
}))
// Allow request with body
server.use(express.json())
// Allow HTML-Forms 
server.use(express.urlencoded({ extended: true }))

// API routes configuration
server.use('/api', router)

// Wait for requests
server.listen(appPort)

// Show info into console for access quickly
console.log(`Server is running at: http://${appHost}:${appPort}`)
