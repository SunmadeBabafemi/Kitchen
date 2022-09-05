const mongoose = require('mongoose')

const schema = mongoose.Schema(
    {
        picture: String,
        name: String,
        price: Number,
        added_by: String,
        quantity_available: Number
    },
    {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
    }
)

module.exports = mongoose.model('Meal', schema)