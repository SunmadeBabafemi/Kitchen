const createError = require('../../common/helpers/createError')
const {createResponse} = require('../../common/helpers/createResponse')
const {RESPONSE, HTTP} = require('../../common/config/configConstants')
const MealService = require('./meal.service')

exports.createMealController = async (req, res, next) => {
    try {
        const {error, message, data} = await MealService.createMeal(
            {
                admin: req.user, 
                data: req.body
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

exports.getMealsController = async (req, res, next) => {
    try {
        const {error, message, data} = await MealService.getAllMeals(
            req.query.limit,
            req.query.page
        )
        const Data ={
            pagination: data.pagination,
            allMeals: data.allMeals
        }
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
        return createResponse(message, Data)(res, HTTP.CREATED);
    } catch (err) {
        console.error(err);

        return next(createError.InternalServerError(err));
    }
};

exports.searchMealController = async (req, res, next) => {
    try {
        const {error, message, data} = await MealService.searchMeal(req.body)
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

exports.updateMealController = async (req, res, next) => {
    try {
        const {error, message, data} = await MealService.updateAMeal(
            {
                admin: req.user,
                mealId: req.params.id,
                data: req.body
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