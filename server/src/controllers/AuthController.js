import jwt from 'jsonwebtoken'
import express from 'express'
import UserService from '../services/UserService.js'
import RoleService from '../services/RoleService.js'



const AuthController = express.Router()


AuthController.post('/', async (req, res) => {
    const { username, password } = req.body

    const user = await UserService.getByUsername(username)

    if (!user) {
        return res.status(401).send({ message: 'Invalid credentials' })
    }

    if (user.username !== username || user.password !== password) {
        return res.status(401).send({ message: 'Incorrect credentials' })
    }

    const role = await RoleService.get(user.role_id)

    const token = jwt.sign({ username }, process.env.jwtSecret, { expiresIn: '1h' })
    res.send({ token, role: role.name })
})


export const VerifyToken = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(403).json({ message: 'Token required' });
    }

    jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
}


export default AuthController
