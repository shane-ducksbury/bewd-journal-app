import jwt from "jsonwebtoken"

// This is a middleware function which is used to authenticate the JWT
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    // Split the token from the authorization header
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}