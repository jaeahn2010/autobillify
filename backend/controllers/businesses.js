// `localhost:3000/api/businesses`

// modules
const express = require('express')
const router = express.Router()
const jwt = require('jwt-simple')

// db connection, models
const db = require('../models')

// jwt config
const config = require('../../jwt.config.js')

// middleware for authorization
// const authMiddleware = (req, res, next) => {
//     const token = req.headers.authorization
//     if (token) {
//         try {
//             const decodedToken = jwt.decode(token, config.jwtSecret)
//             req.user = decodedToken
//             next()
//         } catch (err) {
//             res.status(401).json({ message: 'Invalid token' })
//         }
//     } else {
//         res.status(401).json({ message: 'Missing or invalid Authorization header' })
//     }
// }

// routes
// get all businesses
router.get('/all', function (req, res) {
    db.Business.find()
        .then(businesses => res.json(businesses))
})

// get business by id
router.get('/:businessId', function (req, res) {
    db.Business.findById(req.params.businessId)
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