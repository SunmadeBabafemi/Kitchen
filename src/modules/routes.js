const { Router } = require("express");
const users = require('./users/user.route')
const orders = require('./order/order.route')
const admin = require('./admin/admin.route');
const meals = require('./meal/meal.route')

module.exports = () =>{
    const router = Router()

    router.use('/users', users)
    router.use('/orders', orders)
    router.use('/admin', admin)
    router.use('/meals', meals)

    return router
}