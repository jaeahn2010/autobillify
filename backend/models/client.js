// require mongoose pkg
const mongoose = require('mongoose');

// client schema
const clientSchema = new mongoose.Schema(
    {
        clientName: { type: String, required: true },
        type: { type: String, required: true },
        notes: { type: String },
        serviceProviderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'ServiceProvider'},
    },
)

// export to `models/index.js`
module.exports = mongoose.model('Client', clientSchema)