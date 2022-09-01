const mongoose = require('mongoose')

const schema = mongoose.Schema(
    {
        username: String,
        email: {type: String, sparse: true},
        phone_number: { type: String, sparse: true },
        password: String,
        last_issued_at: String,
    },
    {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
    }
)

module.exports = mongoose.model('User', schema)