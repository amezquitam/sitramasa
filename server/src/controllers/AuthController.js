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

    const token = jwt.sign({ username, id: user.user_id, role: role.role_id }, process.env.jwtSecret, { expiresIn: '1h' })

    res.cookie('authToken', token, {
        maxAge: 60 * 60 * 24,
        httpOnly: true,
    })

    res.send({ token, role: role.name })
})


const PermissionTemplate = (roles) => (req, res, next) => {
    const token = req.cookies.authToken

    if (!token) {
        return res.status(403).json({ message: 'Token required' });
    }

    jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
        if (err)
            return res.status(401).json({ message: 'Invalid token' });

        console.log(decoded)
        
        if (!roles.includes(decoded.role))
            return res.status(403).json({ message: 'Forbidden' })

        req.user = decoded;
        next();
    })

}


export const RequireAdmin = PermissionTemplate([1])


export const RequireSeller = PermissionTemplate([2])


export const RequireBoatMan = PermissionTemplate([3])


export const RequirePassenger = PermissionTemplate([4])


export const RequireAny = PermissionTemplate([1, 2, 3, 4])


AuthController.get('/', RequireAny, (req, res) => {
    res.sendStatus(200)
})


export default AuthController
