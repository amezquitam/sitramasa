import express from 'express'
import RoleService from '../services/RoleService.js'

const RoleController = express.Router()


RoleController.get('/', async (req, res) => {
    const roles = await RoleService.allRoles()
    res.send(roles)
})


export default RoleController
