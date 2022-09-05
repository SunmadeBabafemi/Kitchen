const Meal = require('./meal.model')
const {getPaginatedRecords} = require('../../common/helpers/paginate')

exports.createMeal = async (payload) => {
    const {admin, data} = payload
    try {
        const meal = await Meal.create({
            picture: data.picture,
            name: data.name,
            price: data.price,
            quantity_available: data.quantity_available,
            added_by: admin.email,      
        })
        
        return {
            error: !meal,
            message: !meal? "Failed to create Meal": "Meal Created successfuly",
            data: !meal? null: {meal}
        }
    } catch (error) {
        meal && meal.deleteOne()
        return {
            error: true,
            message: 'Error creating meal',
            data: error?.response?.data || error
        }
    }
}

exports.getAllMeals = async(limit, page) => {
    try {
        const allMeals = await getPaginatedRecords(Meal, {
            limit: limit,
            page: page,
            data: {},
            selectedFields:
                "picture name price added_by quantity_available"
        })
        return {
            error: !allMeals,
            message: !allMeals? "Failed to create Meal": "Meal Created successfuly",
            data: !allMeals? null: {allMeals: allMeals.data, pagination: allMeals.perPage}
        }
    } catch (error) {
        return {
            error: true,
            message: 'Error getting all meals',
            data: error?.response?.data || error
        } 
    }
}

exports.searchMeal = async (data) => {
    try {
        const {name, price } = data
        var queryObj = {}
        for (var key in data){
            data[key] !== ""? queryObj[key] = data[key]: null
        }
        const meal = await Meal.find(queryObj)
        return {
            error: !meal,
            message: !meal? "Failed to create Meal": "Meal Created successfuly",
            data: !meal? null: {meal}
        }
    } catch (error) {
        return {
            error: true,
            message: "Error fetching meals at this time",
            data: error?.response?.data ||error
        }
    }
}

exports.updateAMeal = async(payload) => {
    const {admin, mealId, data, } = payload
    try {
        const {picture, name, price, quantity_available } = data
        var queryObj = {added_by: admin.email}
        for (var key in data){
            data[key] !== ""? queryObj[key] = data[key]: null
        }
        await Meal.findByIdAndUpdate({_id: String(mealId)},queryObj, {new: true, runValidators: true})
        const meal = await Meal.findById(String(mealId))
        return {
            error: !meal,
            message: !meal? "Failed to update Meal": "Meal updated successfuly",
            data: !meal? null: {meal}
        }
    } catch (error) {
        return {
            error: true,
            message: "Error updating meals at this time",
            data: error?.response?.data ||error
        }
    }
}