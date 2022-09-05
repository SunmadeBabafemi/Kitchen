const {Router} = require('express')
const orderController = require('./order.controller')
const validateRequest = require('../../middlewares/validateRequest')
const orderSchema = require('./order.schema')
const {authCheck} = require('../../middlewares/authCheck')
const { authAdminCheck } = require('../../middlewares/authorizeAdmin')

const router = Router()
router.post(
    '/create',
    validateRequest(orderSchema.createOrderSchema, "body"),
    authCheck,
    orderController.createOrderController
)
router.post(
    '/get',
    authCheck,
    orderController.getAllOrdersByAUserController
)
router.put(
    '/approve',
    authAdminCheck,
    orderController.approveOrderController
)
router.put(
    '/deliver',
    authAdminCheck,
    orderController.setOrderDeliveryController
)
module.exports = router