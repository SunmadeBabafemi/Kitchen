let email_validator = require('email-validator')
const {HTTP, RESPONSE} = require('../common/config/configConstants')
const createError = require('../common/helpers/createError')
const User = require('../modules/users/user.model')

exports.authorizeLogin = async (req, _, next) => {
    let email = String(req.body.email)
    if(email_validator.validate(email)){
        email = req.body.email.toLowerCase()
    }
    try {
        let user = null
        user = await User.findOne({
            $and: [
                {
                    $or:[
                        {username: String(email)},
                        {email: String(email)}
                    ],
                }
            ]
        })
        if(!user){
            return next (
                createError(HTTP.OK, [
                    {
                        status: RESPONSE.ERROR,
                        message: "User not found",
                        code: HTTP.BAD_REQUEST
                    }
                ])
            )
        } else {
            req.user = user
            next()
        }
    } catch (error) {
        console.error(error);
        return next(createError.InternalServerError(error));
    }
    
}