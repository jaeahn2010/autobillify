// `localhost:3000/api/serviceProviders`

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
// get serviceProvider by id
router.get('/:serviceProviderId', function (req, res) {
    db.ServiceProvider.find({ serviceProviderId: req.params.serviceProviderId })
        .then(serviceProvider => res.json(serviceProvider))
})

// edit serviceProvider
router.put('/:serviceProviderId', authMiddleware, async (req, res) => {
    const serviceProvider = await db.ServiceProvider.findById(req.params.serviceProviderId)
    if (serviceProvider.id === req.user.id) {
        const editedServiceProvider = await db.ServiceProvider.findByIdAndUpdate(
            req.params.serviceProviderId,
            req.body,
            { new: true }
        )
        res.json(editedServiceProvider)
    } else {
        res.status(401).json({ message: 'Invalid user or token'})
    }
})

// delete serviceProvider
router.delete('/:serviceProviderId', authMiddleware, async (req, res) => {
    const serviceProvider = await db.ServiceProvider.findById(req.params.serviceProviderId)
    if (serviceProvider.id === req.user.id) {
        const deletedServiceProvider = await db.ServiceProvider.findByIdAndDelete(req.params.serviceProviderId)
        res.send('Successfully deleted service provider ' + deletedServiceProvider._id)
    } else {
        res.status(401).json({ message: 'Invalid user or token'})
    }
})

// sign up (create)
router.post('/signup', (req, res) => {
    db.ServiceProvider.create(req.body)
        .then(serviceProvider => {
            const token = jwt.encode({ id: serviceProvider.id }, config.jwtSecret)
            res.json({ token: token })
        })
        .catch(() => {
            res.status(401)
                .json({ message: 'Could not create a new user, try again' })
        })
})

// log in
router.post('/login', async (req, res) => {
    const foundUser = await db.ServiceProvider.findOne({ email: req.body.email })
    if (foundUser && foundUser.password === req.body.password) {
        const payload = { id: foundUser.id }
        const token = jwt.encode(payload, config.jwtSecret)
        res.json({
            token: token,
            email: foundUser.email
        })
    } else {
        res.status(401)
        .json({ message: 'Could not find user with that email/password' })
    }
})

// export to server.js
module.exports = router