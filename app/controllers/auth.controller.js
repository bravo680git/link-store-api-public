import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js'
import { JWT_SECRET_KEY } from '../config/jwt.config.js'

const register = async (req, res) => {
    const account = req.body
    const {username, password, passwordConfirm} = account
    if (password !== passwordConfirm) {
        return res.status(400).json('Confirm password must simillar as password')
    }
    try {
        const user = await userModel.findOne({username: username})
        
        if (!user) {
            await userModel.create({username, password})
            res.json('Registered new account sucessful')
        }
        else {
            res.status(400).json('Username has already existed')
        }
    } catch (error) {
        res.status(500).json('Fail to create new account:' + error)
    }
}

const login = async (req, res) => {
    const { username, password } = req.body

    try {
        const account = await userModel.findOne({username, password})
        if (account) {
            const authToken = jwt.sign({userId: account._id}, JWT_SECRET_KEY, {expiresIn: 3600})
            res.json({
                role: account.role,
                authToken,
                expiresIn: "3600s"
            })
        }
        else {
            res.status(400).json('Username or password are incorrect')
        }
    } catch (error) {
        res.status(500).json('Fail to login:'+error)
    }
}

export default { register, login }
