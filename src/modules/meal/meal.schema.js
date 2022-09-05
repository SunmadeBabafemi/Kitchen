const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require('joi-objectid')(Joi)

exports.createMealSchema = Joi.object().keys({
  picture:Joi.string().trim().optional(),
  name: Joi.string().trim().required(),
  price: Joi.number().integer(),
  quantity_available: Joi.number().integer()

})

exports.updateMealSchema = Joi.object().keys({
  picture:Joi.string().trim().optional(),
  name: Joi.string().trim().optional(),
  price: Joi.number().integer().optional(),
  quantity_available: Joi.number().integer().optional()

})