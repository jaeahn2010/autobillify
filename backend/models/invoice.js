// require mongoose pkg
const mongoose = require('mongoose');

// invoice schema
const invoiceSchema = new mongoose.Schema(
    {
        businessId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Business'},
        serviceProviderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'ServiceProvider'},
        clientId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Client'},
        invoiceNumber: { type: Number, required: true }, // grab latest invoice number from service provider & auto-update
        billedDate: { type: String, required: true },
        services: [{ //itemization
            serviceDate: { type: String, required: true },
            serviceName: { type: String, required: true },
            hoursWorked: { type: Number },
            baseCharge: { type: Number, required: true },
            miscellanousFees: { 
                feeType: { type: String, required: true }, //travel, equipment, convenience, etc.
                amount: { type: Number, required: true },
            }, 
            totalFee: { type: Number },
        }],
        lateFeePolicy: {
            feeType: { type: String }, //flat fee, percentage, etc.
            amount: { type: Number },
            gracePeriod: { type: Number }, //days before late fee applies
        },
    },
    { timestamps: true }
)

// export to `models/index.js`
module.exports = mongoose.model('Invoice', invoiceSchema)