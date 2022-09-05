const createError = require('../../common/helpers/createError')
const {createResponse} = require('../../common/helpers/createResponse')
const {RESPONSE, HTTP} = require('../../common/config/configConstants')
const OrderService = require('./order.service')

exports.createOrderController = async (req, res, next) => {
    try {
        const {error, message, data} = await OrderService.createOrder(
          {
            user: req.user,
            orders: req.body
          }
        )

        if (error) {
            return next(
                createError(HTTP.OK, [
                    {
                        status: RESPONSE.ERROR,
                        message,
                        statusCode:
                        data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
                        data,
                        code: HTTP.BAD_REQUEST,
                    },
                ])
            );
        }
        return createResponse(message, data)(res, HTTP.CREATED);
    } catch (err) {
        console.error(err);

        return next(createError.InternalServerError(err));
    }
};

exports.getAllOrdersByAUserController = async (req, res, next) => {
    try {
        const {error, message, data} = await OrderService.getmyOrders(req.user, req.body)

        if (error) {
            return next(
                createError(HTTP.OK, [
                    {
                        status: RESPONSE.ERROR,
                        message,
                        statusCode:
                        data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
                        data,
                        code: HTTP.BAD_REQUEST,
                    },
                ])
            );
        }
        return createResponse(message, data)(res, HTTP.CREATED);
    } catch (err) {
        console.error(err);

        return next(createError.InternalServerError(err));
    }
};

exports.approveOrderController = async (req, res, next) => {
    try {
        const {error, message, data} = await OrderService.approveOrder({
            admin: req.user, 
            data: req.body
        })

        if (error) {
            return next(
                createError(HTTP.OK, [
                    {
                        status: RESPONSE.ERROR,
                        message,
                        statusCode:
                        data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
                        data,
                        code: HTTP.BAD_REQUEST,
                    },
                ])
            );
        }
        return createResponse(message, data)(res, HTTP.CREATED);
    } catch (err) {
        console.error(err);

        return next(createError.InternalServerError(err));
    }
};

exports.setOrderDeliveryController = async (req, res, next) => {
    try {
        const {error, message, data} = await OrderService.setOrderDelivery({data: req.body})

        if (error) {
            return next(
                createError(HTTP.OK, [
                    {
                        status: RESPONSE.ERROR,
                        message,
                        statusCode:
                        data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
                        data,
                        code: HTTP.BAD_REQUEST,
                    },
                ])
            );
        }
        return createResponse(message, data)(res, HTTP.CREATED);
    } catch (err) {
        console.error(err);

        return next(createError.InternalServerError(err));
    }
};
