const mongoose = require('mongoose')
const bookOrder = mongoose.Schema({
    id : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Book',
        required: true
    },
    format: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})
const orderModel = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    order:{
        type: [bookOrder]
    },
    shipping:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shipping'
    }
})

module.exports = mongoose.model('Order',orderModel)
