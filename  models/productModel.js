var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

var Currency = mongoose.Types.Currency;

const ProductSchema = new Schema ({
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    unitPrice: {
        type: Currency,
        required: true,
        min: 0
    },
    unitsInStock: {
        type: Number,
        required: true
    },
    unitsOnOrder: {
        type: Number,
        required: true
    },
    Discount: {
        type: Currency,
        required: true
    },
    image: {
        type: String,
        required: true
    }
    // ,
    // supplierID: {
    //     type: String,
    //     required: true
    // },

})

var Products = mongoose.model('Product', ProductSchema)
module.exports = Products