// Require the Mongoose package & your environment configuration
require('dotenv').config()
const mongoose = require('mongoose')

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODBURI);
const db = mongoose.connection

db.on('connected', function () {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`)
})

// Export models and seed data to `server.js`
module.exports = {
    Business: require('./business'),
    Client: require('./client'),
    Invoice: require('./invoice'),
    ServiceProvider: require('./serviceProvider'),
}
