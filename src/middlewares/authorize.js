const JWToken = require('../common/utils/jwt.utils')

module.exports = function authorizeEndpoint(req, res, next) {
    const freeRoutes = [

    ]
    if(freeRoutes.includes(req.path)){
        next()
    } else {
        const authToken = req.header('auhtorization')
        if (authToken){
            const token = authToken.split(" ")[1]
            const isToken = JWToken.decodeJWT(token)
            if(isToken){
                next()
            } else {
                res.status(400).json({
                    error: 'Token is either invalid or expired'
                })
            }
        } else {
            res.status(400).json({
                eror: "token expected in request header"
            })
        }
    }
}