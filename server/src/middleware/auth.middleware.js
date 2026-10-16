import jwt from 'jsonwebtoken'

export function verifyAuthToken(req,res,next) {
    try {
    const token = req.cookies.user
    if(!token) throw new Error("User not logged in")
    const isValid = jwt.verify(token,process.env.JWT_SECRET)
    req.userId = isValid.id
    return next()
    } catch(err) {
        res.clearCookie("token")
        return next(err)
    }
}