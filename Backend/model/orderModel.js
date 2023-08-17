const mongoose = require('mongoose')
const orderModel = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //instead of just making the bookOrder array inside the order, bookorders are saved seperately
    //in case needed to give to a supplier
    order:{
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'BookOrder'}]
    },
    //Putting only the id of the shipping information to avoid sending it to the user local storage as it's sensitive information
    shipping:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shipping'
    }
})

module.exports = mongoose.model('Order',orderModel)