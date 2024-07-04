// require mongoose pkg
const mongoose = require('mongoose');

// invoice schema
const invoiceSchema = new mongoose.Schema(
    {
        businessId: { type: mongoose.Schema.Types.ObjectId, required: true},
        serviceProviderId: { type: mongoose.Schema.Types.ObjectId, required: true},
        clientId: { type: mongoose.Schema.Types.ObjectId, required: true},
        invoiceNumber: { type: Number, required: true }, // grab latest invoice number from service provider & auto-update
        billedDate: { type: String, required: true },
        services: [{ //itemization
            serviceDate: { type: String, required: true },
            serviceName: { type: String, required: true },
            hoursWorked: { type: Number },
            miscellanousFees: { 
                feeType: { type: String, required: true }, //travel, equipment, convenience, etc.
                amount: { type: Number, required: true },
            }, 
            totalFee: { type: Number },
        }],
        gracePeriod: { type: Number }, //days before late fee applies
        lateFeePolicy: {
            feeType: { type: String, required: true }, //flat fee, percentage, etc.
            amount: { type: Number, required: true },
        }
    },
)

// export to `models/index.js`
module.exports = mongoose.model('Invoice', invoiceSchema)