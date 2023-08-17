const Shipping = require('../model/shippingModel')
const Order = require('../model/orderModel')
const BookOrder = require('../model/bookOrderModel')
const cartController = require('./cartController')

const saveBookOrder = async( book ) =>{
    bookOrder = new BookOrder({
        id: book.bookId,
        format: book.format,
        price: book.price,
        quantity: book.quantity
    })
    await bookOrder.save()
    return bookOrder._id;
}

const order = async (req, res) =>{
    try {
        const userId = req.body.user.id;
        const userOrder = req.body.cart;
        const OrderedBooks = [];
        const OrderedBooksIDs = [];
        for (const key in userOrder) {
            if (userOrder.hasOwnProperty(key)) {
                OrderedBooks.push(userOrder[key]);
            }
        }
        const information = req.body.shipping;
        const shipping = new Shipping({
            addressLine1: information.addressLine1,
            addressLine2: information.addressLine2,
            city : information.city,
            phone: information.telephone
            },
        )
        await shipping.save();
        for (const book of OrderedBooks) {
            const orderID = await saveBookOrder(book);
            OrderedBooksIDs.push(orderID);
        }
        shippingId = shipping._id;
        const order = new Order({
            user: userId,
            order: OrderedBooksIDs,
            shipping: shippingId
        })
        await order.save();
        await cartController.clearCart(userId);
        res.status(200).json(
            {   
                message: 'Order Placed Successfully',
                cart: []
            }
        )
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message : "Internal Server Error"
        });
    }
}
const retrieveOrders = async (userId) => {
    const orders = await Order.find({user : userId});
    const toReturn = []
    if(orders){
        const {cart, ...restOfTheData} = orders
        for(const book of cart){
            toReturn.push(await BookOrder.findById(book))
        }
    }
    console.log(toReturn);
    return toReturn;
}

module.exports= {
    order,
    retrieveOrders
}