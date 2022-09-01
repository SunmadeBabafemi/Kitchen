const jwt = require('jsonwebtoken')
const {JWT} = require('../config/configConstants')

exports.signJwt = (data) => {
    const token = jwt.sign(
        data, 
        JWT.secret,
        {expiresIn: JWT.time}
    )
    return token
},
exports.decodeJWT = (token) => {
    const data = jwt.verify(token, JWT.secret, (err, decoded) => {
        if(err){
            return false
        }
        return decoded
    })
    return data
}
