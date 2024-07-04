// `localhost:3000/api/invoices`

// modules
const express = require('express')
const router = express.Router()

// db connection, models
const db = require('../models')

// routes
// get all invoices
router.get('/', function (req, res) {
    db.Invoice.find()
        .then(invoices => res.json(invoices))
})

// get invoice by id
router.get('/:invoiceId', function (req, res) {
    db.Invoice.find({ invoiceId: req.params.invoiceId })
        .then(invoice => res.json(invoice))
})

// create new invoice
router.post('/', (req, res) => {
    db.Invoice.create(req.body)
        .then(invoice => res.json(invoice))
})

// edit invoice
router.put('/:invoiceId', (req, res) => {
    db.Invoice.findByIdAndUpdate(
        req.params.invoiceId,
        req.body,
        { new: true }
    )
        .then(business => res.json(business))
})

// delete invoice
router.delete('/:invoiceId', (req, res) => {
    db.Invoice.findByIdAndDelete(req.params.invoiceId)
        .then(() => res.json({ deletedInvoiceId: req.params.invoiceId }))
})

// export to server.js
module.exports = router