const mongoose = require('mongoose')

const schema = mongoose.Schema(
    {
        ordered_items: Array,
        order_tracker: String,
        total_items: Number,
        ordered_by: String,
        total_amount: Number,
        paid: {type:Boolean, default: false},
        approved_by: String,
        delivered:{type: Boolean, default: false}
    },
    {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
    }
)

module.exports = mongoose.model('Order', schema)