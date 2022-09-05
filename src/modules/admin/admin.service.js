const {hashPassword, comparePassword} = require('../../common/helpers/password')
const Admin = require('./admin.model')
const {signJwt, decodeJWT} = require('../../common/utils/jwt.utils')
const RefreshToken = require('../users/userRefreshToken')

exports.registerAdmin = async (payload) => {
    let admin = null
    try {
        const { superAdmin, data } = payload

        let password
        const email = data.email && data.email.toLowerCase()
        const username = data.username? data.username : String(email).split("@")[0]
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
        // if((email !== "elijahmaria04@gmail.com" || "babafemiolasunmade@gmail.com" )
        //     ||(superAdmin.email !== "elijahmaria04@gmail.com" )){
        //     return{
        //         error: true,
        //         message: "only super admin can perform this action",
        //         data: null
        //     }
        // }

        admin = await Admin.create({
            ...data,
            password: data.password? password: null,
            username: username,
            email: data.email? email: null
        })
        const adminData = {
            id: admin._id,
            email:  admin.email
        }
        const token = signJwt(adminData)
        const userRefreshToken = await  RefreshToken.create({
            user_id: admin._id,
            token: token,
            isActive: true,
        })
         //delete user's password before returning to client
        delete admin._doc.password

        //TODO send email notification
        return {
            error: !admin,
            message: !admin? "Failed to register admin": "Registration succesful",
            data: !admin? null: {admin, token}
        }
    } catch (error) {
        admin && admin.deleteOne()
        return {
            error: true,
            message: 'Error creating user',
            data: error?.response?.data || error
        }
    }
}

exports.loginAdmin = async (admin, data) => {
    // const {admin, data} = payload
    let date =  new Date()
    try {
        if(data.password){
            const matchPassword = await comparePassword(admin.password, data.password)
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
        const adminData = {
            id: admin._id,
            email:  admin.email
        }
        const accessToken = signJwt(adminData)
        const OldRefreshToken = await RefreshToken.findOneAndUpdate(
            {user_id: admin._id},
            {token: String(accessToken)},
            {new: true}
        )
        if(!OldRefreshToken){
            const userRefreshToken = await RefreshToken.create({
                user_id: admin._id,
                token: accessToken,
                isActive: true,
            })
        } 
        await  Admin.findByIdAndUpdate(
            {_id: admin._id}, 
            {last_issued_at: date.toTimeString() +", " + date.toDateString()}
        )
        delete admin._doc.password;
        return {
            error: !admin,
            message: !admin ? "Failed to login admin" : "Login successful",
            data: !admin ? null : { admin, accessToken },
        };
    } catch (error) {
        return {
            error: true,
            message: "Error logging user at this time",
            data: error,
        };
    }
}