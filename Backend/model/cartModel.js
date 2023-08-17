const {mongoose} = require('mongoose')
const CartBookSchema = mongoose.Schema({
    id:{
        type: String,
        required :true
    },
    name : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    price: {
        type : Number,
        required : true
    },
    quantity: {
        type : Number,
        required : true
    },
});

const cartModel = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    items: [CartBookSchema]
})

module.exports = mongoose.model('Cart',cartModel)