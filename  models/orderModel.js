const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    orderDate:{
        type: Date,
        required: true
    },
    requiredDate:{
        type: Date,
    },
    shippedDate:{
        type: Date,
        required: true
    },
    // shipperId:{
    //     type: mongoose.Types.ObjectId,
    //     ref: ''
    // },
    orderDetails: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderDetail'
    }]
})

var Orders = mongoose.model('Order',OrderSchema);
module.exports = Orders;