const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const OrderDetailsSchema = new Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    quantity:{
        type: number,
        required: true
    },
    Discount:{
        type: Currency,
        min: 0
    }
});

var OrderDetails = mongoose.model('OrderDetail', OrderDetailsSchema);
module.exports = OrderDetails;