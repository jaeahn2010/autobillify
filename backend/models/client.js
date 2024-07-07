// require mongoose pkg
const mongoose = require('mongoose')

// client schema
const clientSchema = new mongoose.Schema(
    {
        clientLastName: { type: String, required: true },
        clientFirstName: { type: String },
        type: { type: String, required: true },
        serviceProviderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'ServiceProvider'},
        tags: [{ type: String }]
    },
)

// export to `models/index.js`
module.exports = mongoose.model('Client', clientSchema)