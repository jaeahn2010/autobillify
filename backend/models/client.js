// require mongoose pkg
const mongoose = require('mongoose');

// client schema
const clientSchema = new mongoose.Schema(
    {
        clientName: { type: String, required: true },
        type: { type: String, required: true },
        notes: { type: String },
    },
)

// export to `models/index.js`
module.exports = mongoose.model('Client', clientSchema)