// `localhost:3000/api/businesses`

// modules
const express = require('express')
const router = express.Router()

// db connection, models
const db = require('../models')

// routes
// get business by id
router.get('/:businessId', function (req, res) {
    db.Business.find({ businessId: req.params.businessId })
        .then(business => res.json(business))
})

// create new business
router.post('/', (req, res) => {
    db.Business.create(req.body)
        .then(business => res.json(business))
})

// edit business
router.put('/:businessId', (req, res) => {
    db.Business.findByIdAndUpdate(
        req.params.businessId,
        req.body,
        { new: true }
    )
        .then(business => res.json(business))
})

// delete business
router.delete('/:businessId', (req, res) => {
    db.Business.findByIdAndDelete(req.params.businessId)
        .then(() => res.json({ deletedBusinessId: req.params.businessId }))
})

// export to server.js
module.exports = router