import express from 'express'
import DockService from '../services/DockService.js'

const DockController = express.Router()


DockController.get('/', async (req, res) => {
    const roles = await DockService.allDocks()
    res.send(roles)
})


export default DockController
