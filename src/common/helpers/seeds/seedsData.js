const fs = require('fs')
const {hashPassword} = require('../password')

exports.seedMeals = async () => {
    try {
        const Meal = require('../../../modules/meal/meal.model')
        const records = await Meal.countDocuments()
        if (records >= 1){
            return
        }
        const data = fs.readFileSync(
            `${process.cwd()}/src/common/helpers/seeds/meal.json`,
            'utf8'
        )
        
        await Meal.insertMany(JSON.parse(data))
    } catch (error) {
       console.log(error); 
    }
}

exports.seedSuperAdmin = async () => {
    try {
        const Admin = require('../../../modules/admin/admin.model')
        const records = await Admin.countDocuments()
        if (records >= 1){
            return
        }
        const data = fs.readFileSync(
            `${process.cwd()}/src/common/helpers/seeds/adminSuper.json`,
            'utf8'
        )
        const dataObject = JSON.parse(data)
        
        await Admin.insertMany(dataObject)
    } catch (error) {
       console.log(error); 
    }
}