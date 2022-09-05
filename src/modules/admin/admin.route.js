const {Router} = require('express')
const adminController = require('./admin.controller')
const validateRequest = require('../../middlewares/validateRequest')
const adminSchema = require('./admin.schema')
const {checkExistingAdmin} = require('../../middlewares/checkExistingUser')
const { authorizeAdminLogin } = require('../../middlewares/authorizeLogin')
const { authSuperAdminCheck } = require('../../middlewares/authorizeAdmin')

const router = Router()
router.post(
    '/register',
    validateRequest(adminSchema.registerAdminSchema, "body"),
    checkExistingAdmin,
    authSuperAdminCheck,
    adminController.registerAdminController
)
router.post(
    '/login',
    validateRequest(adminSchema.loginAdminSchema, "body"),
    authorizeAdminLogin,
    adminController.loginAdminController
)

module.exports = router