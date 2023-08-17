const mongoose = require('mongoose')

const bookModel = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
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
    year : {
        type : Number,
        required : true
    },
    price: {
        type : Number,
        required : true
    },
    lang: {
        type : String,
        required : true
    },
    format: {
        type : String,
        required : true
    },
    featured:{
        type: Boolean,
        default : false
    }
})

module.exports = mongoose.model('Book',bookModel)