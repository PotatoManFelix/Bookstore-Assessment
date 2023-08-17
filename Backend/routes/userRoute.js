const express = require('express')
const userRoute = express()
const userController = require('../controller/userController')

// Register
userRoute.post('/register', userController.postRegister)

// Login 
userRoute.post('/login', userController.postlogin)

// LogOut
userRoute.post('/logout', userController.logOut)

userRoute.post('/check-session', userController.isUserStillLoggedIn)

module.exports = userRoute