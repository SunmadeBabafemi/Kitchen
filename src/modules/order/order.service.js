const Order = require('./order.model')
const Meal = require('../meal/meal.model')

exports.createOrder = async (data) => {
    try {
        const {user, orders} = data
        const items = orders.order_tray
        const quantity = Number(items.length)
        let total_price = 0
        const total_meals = []




        for(const meal_id of items){
            await Meal.findByIdAndUpdate({_id: String(meal_id)}, {"$inc":{"quantity_available": -1}})
            let meal = await Meal.findOne({_id: String(meal_id)}).select(" name picture price")
            var mealPrice = Number(meal.price);
            total_price +=  mealPrice
            total_meals.push(meal)
        }
        console.log(total_meals);

        const tracker = String("MRA" + Math.floor(Math.random()*1000) + "KIT")
        const order = await Order.create({
            ordered_items: total_meals,
            order_tracker: tracker,
            total_items: quantity,
            ordered_by: user.email,
            total_amount: total_price,
        })
        
        return {
            error: !order,
            message: !order? "Failed to create Order": "Order Created successfuly",
            data: !order? null: {order}
        }
    } catch (error) {
        order && order.deleteOne()
        return {
            error: true,
            message: 'Error creating order',
            data: error?.response?.data || error
        }
    }
}

exports.getmyOrders = async(user, data)=> {
    try {
        const { order_tracker, total_amount, total_items  } = data
        var queryObj = {ordered_by: user.email}
        for(var key in data){
            data[key] !==""? queryObj[key] = data[key]: null
        }
        const allOrders = await Order.find(queryObj)
        if(!allOrders){
            return{
                error: true,
                message: 'No orders found for this user',
                data: null
            }
        }
        
        return {
            error: false,
            message: `All orders for ${user.email} retreived succsessfully`,
            data: allOrders
        }
    } catch (error) {
        return {
            error: true,
            message: 'Error retreiving your orders at this time',
            data: error?.response?.data || error
        }
    }
}

exports.approveOrder = async (payload) => {
    const {admin, data} = payload
    try {
        let paidData = {}
        let info
        const isOrder = await Order.findOne({order_tracker: data.order_tracker})
        if(!isOrder){
            return {
                error: true,
                message: "Order not found",
                data: null
            }
        }
        if(isOrder.paid === false) {
            paidData = {paid: true, approved_by: admin.email}
            info = "approve"
        }
        if(isOrder.paid === true) {
            paidData = {paid: false}
            info = "disapprove"
        }
        const order = await Order.findOneAndUpdate(
            {order_tracker: data.order_tracker},
            paidData, 
            {new: true}
        )
        return{
            error: !order,
            message: !order? `Failed to ${info} customer's order`: `${info} order successful`,
            data: !order? null: {order}
        }
    } catch (error) {
        return{
            error: true,
            message: "Error approving customer's order at this moment",
            data: error?.response?.data || error
        }
    }
}

exports.setOrderDelivery = async (payload) => {
    const {data} = payload
    try {
        let deliverData = {}
        let info
        const isOrder = await Order.findOne({order_tracker: data.order_tracker})
        if(!isOrder){
            return {
                error: true,
                message: "Order not found",
                data: null
            }
        }
        if(isOrder.delivered === false) {
            deliverData = {delivered: true}
            info = "delivered"
        }
        if(isOrder.delivered === true) {
            deliverData = {delivered: false}
            info = "not delivered"
        }
        const order = await Order.findOneAndUpdate(
            {order_tracker: data.order_tracker},
            deliverData, 
            {new: true}
        )
        return{
            error: !order,
            message: !order? `Order ${info} successfully`: `${info} order successfully`,
            data: !order? null: {order}
        }
    } catch (error) {
        return{
            error: true,
            message: "Error setting order's delivery status at this moment",
            data: error?.response?.data || error
        }
    }
}