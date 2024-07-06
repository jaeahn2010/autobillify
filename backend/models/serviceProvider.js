// require mongoose pkg
const mongoose = require('mongoose')

// service provider schema
const serviceProviderSchema = new mongoose.Schema(
    {
        businessId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Business'},
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, minlength: 8},
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
)

// export to `models/index.js`
module.exports = mongoose.model('ServiceProvider', serviceProviderSchema)