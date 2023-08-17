const Shipping = require('../model/shippingModel')
const Order = require('../model/orderModel')

const saveShippingInformation = async (information) =>{
    var myId = mongoose.Types.ObjectId();
    const shipping = new Shipping({
        id: myId,
        addressLine1: information.addressLine1,
        addressLine2: information.addressLine2,
        city : information.city,
        phone: information.telephone
    })
    await shipping.save();
    return myId;
}

const order = async (req, res) =>{
    try {
        const userId = req.body.user.id;
        const userOrder = req.body.cart;
        const shippingInformation = req.body.shipping;
        const shippingInformationId = await saveShippingInformation(shippingInformation);
        const order = new Order({
            user: userId,
            cart: userOrder,
            shipping: shippingInformationId
        })
        await order.save();
        res.status(200).json({message: 'Order Placed Successfully'})
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message : "Internal Server Error"
        });
    }
}

module.exports= {
    order
}