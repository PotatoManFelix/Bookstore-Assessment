const Cart = require('../model/cartModel'); // Assuming you have defined these models

async function assignCart(user) {
  try {
    // Check if the user already has a shopping cart
    const existingCart = await Cart.findOne({ user: user._id });

    if (existingCart) {
      console.log('User already has a shopping cart.');
      return;
    }

    // Create a new shopping cart
    const newCart = new Cart({
      user: user._id,
      items: []
    });

    await newCart.save();

    console.log('Shopping cart assigned to user', user._id);
  } catch (error) {
    console.error('Error assigning cart:', error);
  }
}

async function retrieveCart(user){
  var cart = await Cart.findOne({ user: user._id });
  if(!cart){
    console.log("NO CART ASSIGNED TO USER", user._id, ", assigning cart manually");
    await assignCart(user);
    cart = await Cart.findOne({ user: user._id })
  }
  return cart.items;
}

async function saveCart(userId,cartProducts){
  try {
    await Cart.findOneAndUpdate({ user: userId },{ $set: {items: cartProducts}}, { runValidators: true, context: 'query' });    
  } catch (error) {
    console.log(error);
  }
}
async function clearCart(userId){
  try {
    await Cart.findOneAndUpdate({user: userId}, { $set: {items: []}})
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  assignCart,
  retrieveCart,
  saveCart,
  clearCart
}