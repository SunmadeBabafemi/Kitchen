const {HTTP, RESPONSE,} = require('../common/config/configConstants')
const User = require('../modules/users/user.model')
const createError = require('../common/helpers/createError')
const RefreshToken = require('../modules/users/userRefreshToken')
const jwt = require('../common/utils/jwt.utils')


exports.authCheck = async (req, _, next) => {
    const message = "Unauthorized" 
    const token = 
    req.headers['authorization']&& req.headers['authorization'].split(' ')[1] 

    if(!token){
        return next(
            createError(HTTP.UNAUTHORIZED, [
                {
                    status: RESPONSE.ERROR,
                    message,
                    statusCode: HTTP.UNAUTHORIZED,
                }
            ])
        )
    }
    try {
        const {id} = jwt.decodeJWT(token)
        const user = await User.findById(id)

        if(!user){
            return next(
                createError(HTTP.UNAUTHORIZED, [
                {
                    status: RESPONSE.ERROR,
                    message,
                    statusCode: HTTP.UNAUTHORIZED,
                },
                ])
            );
        }
        if (user) {
            req.userId = id;
            req.user = user;
            req.token = token;
            return next();
        }

        return next(
        createError(HTTP.UNAUTHORIZED, [
            {
            status: RESPONSE.ERROR,
            message,
            statusCode: HTTP.UNAUTHORIZED,
            },
        ])
        );
    } catch (error) {
        console.log(err);
        return next(createError.InternalServerError());
    }
}