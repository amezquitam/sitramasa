import express from 'express'
import UserService from '../services/UserService.js'

const UserController = express.Router()


UserController.get('/:id', async (req, res) => {
    const { id } = req.params
    const possibleUser = await UserService.get(id)
    if (!possibleUser) {
        return res.sendStatus(404)
    }
    res.send(possibleUser)
})


UserController.post('/', async (req, res) => {
    const { firstname, lastname, username, password, roleId } = req.body
    const created = await UserService.create({
        firstname, lastname, username, password, roleId
    })

    if (created)
        res.send({ message: 'user created succesfully' })
    else 
        res.send({ message: 'an error has ocurred' })
})


export default UserController
