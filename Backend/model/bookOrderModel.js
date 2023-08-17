const mongoose = require('mongoose')
const bookOrderModel = mongoose.Schema({
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

module.exports = mongoose.model('BookOrder', bookOrderModel)
