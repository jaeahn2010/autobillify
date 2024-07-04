// `localhost:3000/api/clients`

// modules
const express = require('express')
const router = express.Router()

// db connection, models
const db = require('../models')

// routes
// get client by id
router.get('/:clientId', function (req, res) {
    db.Client.find({ clientId: req.params.clientId })
        .then(client => res.json(client))
})

// create new client
router.post('/', (req, res) => {
    db.Client.create(req.body)
        .then(client => res.json(client))
})

// edit client
router.put('/:clientId', (req, res) => {
    db.Client.findByIdAndUpdate(
        req.params.clientId,
        req.body,
        { new: true }
    )
        .then(client => res.json(client))
})

// delete client
router.delete('/:clientId', (req, res) => {
    db.Client.findByIdAndDelete(req.params.clientId)
        .then(() => res.json({ deletedClientId: req.params.clientId }))
})

// export to server.js
module.exports = router