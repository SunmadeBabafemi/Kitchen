const { Router } = require("express");
const users = require('./users/user.route')

module.exports = () =>{
    const router = Router()

    router.use('/users', users)
    return router
}