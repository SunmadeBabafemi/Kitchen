const {Router} = require('express')
const userController = require('./user.controller')
const validateRequest = require('../../middlewares/validateRequest')
const userSchema = require('./user.schema')
const {checkExistingUser} = require('../../middlewares/checkExistingUser')
const { authorizeLogin } = require('../../middlewares/authorizeLogin')


const router = Router()
router.post(
    '/register',
    validateRequest(userSchema.registerUserSchema, "body"),
    checkExistingUser,
    userController.registerUserController
)
router.post(
    '/login',
    validateRequest(userSchema.loginUserSchema, 'body'),
    authorizeLogin,
    userController.loginUserController
)
module.exports = router