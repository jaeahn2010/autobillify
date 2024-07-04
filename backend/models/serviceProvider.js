// require mongoose pkg
const mongoose = require('mongoose');

// user schema
const serviceProviderSchema = new mongoose.Schema(
    {
        userName: { type: String, required: true },
        type: { type: String, required: true },
        notes: { type: String },
    },
)

// export to `models/index.js`
module.exports = mongoose.model('ServiceProvider', serviceProviderSchema)