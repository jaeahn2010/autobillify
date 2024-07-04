// require mongoose pkg
const mongoose = require('mongoose');

// business schema
const businessSchema = new mongoose.Schema(
    {
        businessName: { type: String, required: true },
        field: { type: String, required: true },
        fees: [{
            feeType: { type: String, required: true },
            feeAmount: { type: Number, required: true}
        }],
    },
)

// export to `models/index.js`
module.exports = mongoose.model('Business', businessSchema)