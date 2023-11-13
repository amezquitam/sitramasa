// external
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
// internal
import './config/dotenv.js'
import router from './controllers/Controller.js'

// In this module we need know the host and port where run the server
const { appPort, appHost } = process.env

// Express server instance
const server = express()

server.use(cors({
    origin: process.env.clientDomain
}))
// Allow request with body
server.use(express.json())
// Allow HTML-Forms 
server.use(express.urlencoded({ extended: true }))
// Habilita el uso de cookies
server.use(cookieParser( process.env.jwtSecret ))
// Evita la cabecera X-Powered-By
server.disable('x-powered-by')

// API routes configuration
server.use('/api', router)

// Wait for requests
server.listen(appPort)

// Show info into console for access quickly
console.log(`Server is running at: http://${appHost}:${appPort}`)
