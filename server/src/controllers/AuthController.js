import express from 'express'
import UserService from '../services/UserService'

import { sign } from 'jsonwebtoken'

const AuthController = express.Router()


AuthController.post('/', async (req, res) => {
    const { username, password } = req.body

    const user = await UserService.get(username)

    if (!user) {
        return res.sendStatus(401)
    }

    if (user.username !== username || user.password !== password) {
        return res.sendStatus(401)
    }


    const token = sign({
        // expires in 30 days
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        username
    }, process.env.jwtSecret)

    res.cookie('auth-token', w)

})


export default AuthController
