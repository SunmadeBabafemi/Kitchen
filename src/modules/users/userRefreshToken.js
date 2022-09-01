const mongoose = require('mongoose')

const schema = mongoose.Schema(
    {
        user_id : {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        token: String,
        isActive: Boolean,
        iat: String,
    },
    {
        timestamps: {createdAt: "created_at", updatedAt: "updated_at"}
    }
)

module.exports = mongoose.model('RefreshToken', schema)