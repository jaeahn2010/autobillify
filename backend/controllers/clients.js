// `localhost:3000/api/clients`

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
    console.log(token)
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
// get client by id
router.get('/:clientId', function (req, res) {
    db.Client.findById(req.params.clientId)
        .then(client => res.json(client))
})

// get clients of a service provider
router.get('/serviceProvider/:serviceProviderId', function (req, res) {
    db.Client.find({ serviceProviderId: req.params.serviceProviderId })
        .then(clients => res.json(clients))
})

// create new client
router.post('/', authMiddleware, (req, res) => {
    db.Client.create({
        ...req.body,
        serviceProviderId: req.user.id
    })
        .then(client => res.json(client))
})

// edit client
router.put('/:clientId', authMiddleware, async (req, res) => {
    const client = await db.Client.findById(req.params.clientId)
    if (client.serviceProviderId === req.user.id) {
        const editedClient = await db.Client.findByIdAndUpdate(
            req.params.clientId,
            req.body,
            { new: true }
        )
        res.json(editedClient)
    } else {
        res.status(401).json({ message: 'Invalid user or token'})
    }
})

// delete client
router.delete('/:clientId', authMiddleware, async (req, res) => {
    const client = await db.Client.findById(req.params.clientId)
    if (client.serviceProviderId === req.user.id) {
        const deletedClient = await db.Client.findByIdAndDelete(req.params.clientId)
        res.send('Successfully deleted client ' + deletedClient._id)
    } else {
        res.status(401).json({ message: 'Invalid user or token'})
    }
})

// export to server.js
module.exports = router