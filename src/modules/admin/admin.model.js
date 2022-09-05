const mongoose = require('mongoose')

const schema = mongoose.Schema(
    {
        username: String,
        email: {type: String, sparse: true, required: true},
        phone_number: { type: String, sparse: true },
        password: String,
        role: { type: String, enum: ["base", "super"], defaul:"base" },
        last_issued_at: String,
    },
    {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
    }
)

module.exports = mongoose.model('Admin', schema)