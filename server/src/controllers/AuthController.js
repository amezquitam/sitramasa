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

    const role = await RoleService.get(user.roleId)

    const token = jwt.sign({ username, userId: user.user_id, role: role.name }, process.env.jwtSecret, { expiresIn: '1h' })

    const expires = new Date(Date.now() + 1000 * 60 * 60)

    res.cookie('authToken', token, {
        expires,
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    })

    res.send({ userId: user.user_id, username, role: role.name })
})


const PermissionTemplate = (roles) => (req, res, next) => {
    const token = req.cookies.authToken

    if (!token) {
        return res.status(403).json({ message: 'Token required' });
    }

    jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
        if (err)
            return res.status(401).json({ message: 'Invalid token' });
        
        if (!roles.includes(decoded.role))
            return res.status(403).json({ message: 'Forbidden' })

        req.user = decoded;
        next();
    })

}


export const RequireAdmin = PermissionTemplate(['Administrador'])


export const RequireSeller = PermissionTemplate(['Vendedor'])


export const RequireBoatMan = PermissionTemplate(['Lanchero'])


export const RequirePassenger = PermissionTemplate(['Pasajero'])


export const RequireAny = PermissionTemplate(['Administrador', 'Vendedor', 'Lanchero', 'Pasajero'])


AuthController.get('/', RequireAny, (req, res) => {
    res.status(200).send(req.user)
})


export default AuthController
