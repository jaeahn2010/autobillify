// modules
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

// db connection, seed data
const db = require('./models')

// routes in controllers folder
const businessesCtrl = require('./controllers/businesses')
const clientsCtrl = require('./controllers/clients')
const invoicesCtrl = require('./controllers/invoices')
const serviceProvidersCtrl = require('./controllers/serviceProviders')

// express app
const app = express()

// middleware 

// cross origin allowance
app.use(cors())
// body parser - used for POST/PUT/PATCH routes:
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// routes
app.use('/api/businesses', businessesCtrl)
app.use('/api/clients', clientsCtrl)
app.use('/api/invoices', invoicesCtrl)
app.use('/api/serviceProviders', serviceProvidersCtrl)

// listen to port
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT)
})
