const mongoose = require('mongoose')

const shippingModel = mongoose.Schema({
    addressLine1: {
        type: String,
        required : true
    },
    addressLine2: {
        type: String,
        required : true
    },
    city: {
        type: String,
        required : true
    },
    phone: {
        type: String,
        required : true
    }
})

module.exports = mongoose.model('Shipping',shippingModel)