const express = require('express');
const bodyParser = require('body-parser');
const Products = require('../ models/productModel')
const ProductsRouter = express.Router();

ProductsRouter.use(bodyParser.json());

ProductsRouter.route('/')
.get((req,res, next) => {
    Products.find({})
    .then((product) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.json(product);
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post((req, res, next) => {
    res.statusCode = 404;
    var err = new Error('POST operation is not applicable here.')
    next(err);
})

module.exports = ProductsRouter;
