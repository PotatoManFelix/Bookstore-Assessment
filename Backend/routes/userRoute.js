const express = require('express')
const userRoute = express()
const userController = require('../controller/userController')
const orderController = require('../controller/orderController')
const cartController = require('../controller/cartController')

// Register
userRoute.post('/register', userController.postRegister)

// Login 
userRoute.post('/login', userController.postlogin)

// LogOut
userRoute.post('/logout', userController.logOut)

userRoute.post('/check-session', userController.isUserStillLoggedIn)

userRoute.post('/order', orderController.order)

userRoute.post('/clear-cart', userController.clearCart)

module.exports = userRoute