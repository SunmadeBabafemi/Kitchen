const {Router} = require('express')
const mealController = require('./meal.controller')
const validateRequest = require('../../middlewares/validateRequest')
const mealSchema = require('./meal.schema')
const {authAdminCheck} = require('../../middlewares/authorizeAdmin')

const router = Router()
router.post(
    '/create',
    validateRequest(mealSchema.createMealSchema, "body"),
    authAdminCheck,
    mealController.createMealController
)
router.get(
    '/get-all',
    mealController.getMealsController
)

router.post(
    '/search',
    mealController.searchMealController
)

router.put(
    '/update/:id',
    validateRequest(mealSchema.updateMealSchema, "body"),
    authAdminCheck,
    mealController.updateMealController
)
module.exports = router