var express = require('express');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Categories = require('../ models/categoryModel');
var Products = require('../ models/productModel');

var CategoriesRouter = express.Router();

CategoriesRouter.use(bodyParser.json());

CategoriesRouter.route('/')
.get((req, res, next) => {
    Categories.find({})
    .populate('products')
    .then((category) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.json(category);
    }, (err) =>next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Categories.create(req.body)
    .then((category) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.json(category);
    }, (err) => next(err))
    .catch((err) => next(err))
})
/////////////////////////////////////////////////////////////////////////////

CategoriesRouter.route('/:categId')
.get((req,res, next) => {
    Categories.findById(req.params.categId)
    .populate('products')
    .then((category) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.json(category);
    }, (err) => next(err))
    .catch((err) => next(err))
})

CategoriesRouter.route('/:categId/products')
.get((req,res, next) => {
    Categories.findById(req.params.categId)
    .then((category) => {
        if (category != null){
            Products.find({})
            .then((product) => {
                res.statusCode = 200;
                res.setHeader('content-type', 'application/json');
                res.json(product);
            })
            .catch((err) => next(err));
        }
        else{
            res.statusCode = 403;
            const err = new Error('Category with id:'+req.params.categId+'doesnot exist');
            next(err);

        }
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post((req,res, next) => {
    Categories.findById(req.params.categId)
    .populate('products')
    .then((category) => {
        if (category != null){
            Products.create(req.body)
            .then((product) => {
                category.products.push(product._id)
                category.save()
                .then((category) => {
                    res.statusCode = 200;
                    res.setHeader('content-type', 'application/json');
                    res.json(category);
                })
                .catch((err) => next(err))
                
            },(err) => next(err))
            .catch((err) => next(err));
        }
        else{
            res.statusCode = 403;
            const err = new Error('Category with id:'+req.params.categId+' doesnot exist');
            next(err);

        }
    }, (err) => next(err))
    .catch((err) => next(err))
})

CategoriesRouter.route('/:categId/products/:productId')
.get((req,res, next) => {
    Products.findById(req.params.productId)
    .then((product) => {
        if(product != null){
            res.statusCode = 200;
            res.setHeader('content-type', 'application/json');
            res.json(product);
        }
        else{
            res.statusCode = 403;
            const err = new Error('Category with id:'+req.params.categId+' doesnot exist');
            next(err);
   
        }
    })
    .catch((err) => next(err))
    
})
.delete((req,res, next) => {
    Categories.findById(req.params.categId)
    .then((category) => {
        if(category != null){
            console.log(category)
            const index = category.products.indexOf(req.params.productId);
            if (index > -1){
                Products.findByIdAndRemove(req.params.productId)
                .then((resp) => {
                    category.products.splice(index, 1)
                    res.statusCode = 200;
                    res.setHeader('content-type', 'application/json');
                    res.json("Deletion Successful");
                })
                .catch((err) => next(err));
            }
            else{
                res.statusCode = 404;
                var err = new Error('Error: no such product id in the ');
                next(err);
            }
        }
        else{
            //category is null
            res.statusCode = 404;
            var err = new Error('Error: no such product id in the ');
            next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err)) 
})
module.exports = CategoriesRouter;