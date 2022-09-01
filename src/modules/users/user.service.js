const {hashPassword, comparePassword} = require('../../common/helpers/password')
const User = require('./user.model')
const {signJwt, decodeJWT} = require('../../common/utils/jwt.utils')
const RefreshToken = require('./userRefreshToken')

exports.registerUser = async (data) => {
    let user = null
    try {
        let password
        const email = data.email && data.email.toLowerCase()
        const username = data.username || String(email).split("@")[0]
        if(data.password){
            password = hashPassword(data.password)
        }

        // check for google auth
        if(data.auth_type ==="gg"){
        // take first part of google display name
        username = username.split(" ")[0];
        }
        // check for apple auth
        if(data.auth_type ==="ap" && data.name){
        let chunks = data.name.split(/\s+/);
        var arr = [chunks.shift(), chunks.join(' ')];
        data.first_name = arr[0];
        data.last_name = arr[1];
        username = arr[0];
        }
        user = await User.create({
            ...data,
            password: data.password? password: null,
            username: username,
            email: data.email? email: null
        })
        const userData = {
            id: user._id,
            email:  user.email
        }
        const token = signJwt(userData)
        const userRefreshToken = await  RefreshToken.create({
            user_id: user._id,
            token: token,
            isActive: true,
        })
         //delete user's password before returning to client
        delete user._doc.password

        //TODO send email notification
        return {
            error: !user,
            message: !user? "Failed to register user": "Registration succesful",
            data: !user? null: {user, token}
        }
    } catch (error) {
        user && user.deleteOne()
        return {
            error: true,
            message: 'Error creating user',
            data: error?.response?.data || error
        }
    }
}

exports.loginUser = async (user, data) => {
    let date =  new Date()
    try {
        if(data.password){
            const matchPassword = await comparePassword(user.password, data.password)
            if(!matchPassword){
                return {
                    error: true,
                    message: "Incorrect password"
                }
            }
        }
        if(!data.password && !data.auth_type){
            return {
                error: true,
                message: "Invalid Authorization"
            }
        }
        const userData = {
            id: user._id,
            email:  user.email
        }
        const accessToken = signJwt(userData)
        const OldRefreshToken = await RefreshToken.findOneAndUpdate(
            {user_id: user._id},
            {token: String(accessToken)},
            {new: true}
        )
        if(!OldRefreshToken){
            const userRefreshToken = await RefreshToken.create({
                user_id: user._id,
                token: accessToken,
                isActive: true,
            })
        } 
        await  User.findByIdAndUpdate(
            {_id: user._id}, 
            {last_issued_at: date.toTimeString() +", " + date.toDateString()}
        )
        delete user._doc.password;
        return {
            error: !user,
            message: !user ? "Failed to login user" : "Login successful",
            data: !user ? null : { user, accessToken },
        };
    } catch (error) {
        return {
            error: true,
            message: "Error logging user at this time",
            data: error,
        };
    }
}