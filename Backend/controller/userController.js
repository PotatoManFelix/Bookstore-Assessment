const User = require('../model/userModel')
const bcrypt = require('bcryptjs')
const cartController = require('../controller/cartController')
const orderController = require('../controller/orderController')
const postRegister = async (req,res) => {
    try {
        const username = req.body.username 
        const email = req.body.email 
        const password = req.body.password 
        
        const alreadyMail = await User.findOne({email : email})
        if(alreadyMail) {
            return res.status(400).send({
                message : "Email Already Registered"
            })
        }
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = new User({
            username : username,
            email : email,
            password : hashedPassword
        })
        await userData.save();
        await cartController.assignCart(userData);
        res.status(200).send({message: 'Registered Successfully'})
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message : "Internal Server Error"
        });
    }
}

const postlogin = async (req,res) => {
    try {
        //obfuscation for security measures
        const user = await User.findOne({email : req.body.email})
        if(!user){
            return res.status(400).send({
                message : 'Login Credentials do not match'
            })
        }

        if(!(await bcrypt.compare(req.body.password, user.password))){
            return res.status(400).send({
                message : 'Login Credentials do not match'
            })
        }
        const cartProducts = await cartController.retrieveCart(user);
        const responseData = {
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            cartProducts: cartProducts,
        };
    
        // req.session.user = responseData.user;
        res.status(200).json(responseData);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message : "Internal Server Error"
        });
    }
}

const logOut = async (req,res) => {
    try{
        const userId = req.body.user.id
        await cartController.saveCart(userId,req.body.cart);
        //TODO: NOT IMPLEMENTED FULLY
        // req.session.destroy((err) => {
        //     if (err) {
        //         console.error('Error destroying session:', err);
        //     }
        //     res.clearCookie('SESS_NAME'); // Clear the session cookie
        // });
        res.status(200).json({message: 'Successfully Logged Out'})
    }catch(error){
        console.log(error);
        return res.status(500).send({
            message : "Internal Server Error"
        });
    }
}

const isUserStillLoggedIn = async (req,res) =>{
    try {
        const cookie = req.session.cookie;
        const user = req.session.user;
        console.log(req.session)
        if(cookie && cookie.expires > Date.now()){
            res.status(200).send({
                message : 'User Still Logged In'
            })
        } else {
            res.status(401).send({
                message: 'User Not Logged In'
            });
        }
    }catch(error){
        console.error(error);
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
}
const clearCart = async (req,res) =>{
    try{
        const userId = req.body.user.id;
        await cartController.clearCart(userId);
        res.status(200).send({
            message: 'Cart Cleared Successfully'
        }) 
    }catch(error){
        console.error(error);
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
}

module.exports = {
    postRegister,
    postlogin,
    logOut,
    isUserStillLoggedIn,
    clearCart
}