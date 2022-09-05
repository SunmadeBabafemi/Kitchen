const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require('joi-objectid')(Joi)

exports.createOrderSchema = Joi.object().keys({
  order_tray: Joi.array().items(Joi.string())
})

