// `localhost:3000/api/serviceProviders`

// modules
const express = require('express')
const router = express.Router()

// db connection, models
const db = require('../models')

// routes
// get serviceProvider by id
router.get('/:serviceProviderId', function (req, res) {
    db.ServiceProvider.find({ serviceProviderId: req.params.serviceProviderId })
        .then(serviceProvider => res.json(serviceProvider))
})

// create new serviceProvider
router.post('/', (req, res) => {
    db.ServiceProvider.create(req.body)
        .then(serviceProvider => res.json(serviceProvider))
})

// edit serviceProvider
router.put('/:serviceProviderId', (req, res) => {
    db.ServiceProvider.findByIdAndUpdate(
        req.params.serviceProviderId,
        req.body,
        { new: true }
    )
        .then(serviceProvider => res.json(serviceProvider))
})

// delete serviceProvider
router.delete('/:serviceProviderId', (req, res) => {
    db.ServiceProvider.findByIdAndDelete(req.params.serviceProviderId)
        .then(() => res.json({ deletedServiceProviderId: req.params.serviceProviderId }))
})

// export to server.js
module.exports = router