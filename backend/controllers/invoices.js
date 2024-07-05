// `localhost:3000/api/invoices`

// modules
const express = require('express')
const router = express.Router()
const jwt = require('jwt-simple')

// db connection, models
const db = require('../models')

// jwt config
const config = require('../../jwt.config.js')

// middleware for authorization
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        try {
            const decodedToken = jwt.decode(token, config.jwtSecret)
            req.user = decodedToken
            next()
        } catch (err) {
            res.status(401).json({ message: 'Invalid token' })
        }
    } else {
        res.status(401).json({ message: 'Missing or invalid Authorization header' })
    }
}

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
router.post('/', authMiddleware, (req, res) => {
    db.Invoice.create({
        ...req.body,
        serviceProviderId: req.user.id
    })
        .then(invoice => res.json(invoice))
})

// edit invoice
router.put('/:invoiceId', authMiddleware, async (req, res) => {
    const invoice = await db.Invoice.findById(req.params.invoiceId)
    if (invoice.serviceProviderId === req.user.id) {
        const editedInvoice = await db.Invoice.findByIdAndUpdate(
            req.params.invoiceId,
            req.body,
            { new: true }
        )
        res.json(editedInvoice)
    } else {
        res.status(401).json({ message: 'Invalid user or token'})
    }
})

// delete invoice
router.delete('/:invoiceId', authMiddleware, async (req, res) => {
    const invoice = await db.Invoice.findById(req.params.invoiceId)
    if (invoice.serviceProviderId === req.user.id) {
        const deletedInvoice = await db.Invoice.findByIdAndDelete(req.params.invoiceId)
        res.send('Successfully deleted invoice ' + deletedInvoice._id)
    } else {
        res.status(401).json({ message: 'Invalid user or token'})
    }
})

// export to server.js
module.exports = router