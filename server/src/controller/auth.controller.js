import { getUser, newUser } from "../services/auth.service.js"
import jwt from 'jsonwebtoken'
import { verifyPassword } from "../services/hash.service.js"
export async function register(req, res, next) {
    try {
        const user = req.body
        const userModel = await newUser(user)
        const id = userModel.id
        return sendAuthCookie(res, id)
    } catch (err) {
        next(err)
    }
}

export async function login(req, res, next) {
    try {
        const { email, password } = req.body
        const user = await getUser(email)
        if (!user) {
            throw new Error('User with that Email does not exist')
        }
        const correctPassword = await verifyPassword(password, user.password)
        if (!correctPassword) {
            throw new Error('Password is incorrect')
        }
        return sendAuthCookie(res, user.id)
    } catch (err) {
        next(err)
    }
}

export function isLoggedIn(req,res) {
    return res.send({
        success: true,
        user: req.userId
    })
}

function sendAuthCookie(res, id) {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })

    const cookieSettings = {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        secure: process.env.NODE_ENV === 'production',
    }

    return res
        .cookie('user', token, cookieSettings)
        .status(200)
        .send({ success: true })
}