// const mongodb = require('mongodb');
const Product = require('../models/product');

//const ObjectId = mongodb.ObjectId;
exports.getAddProduct = (req,res,next)=>{
    
    //res.sendFile(path.join(rootDir,'views','add-product.html'));
    //res.render('add-product',{docTitle : 'Add Product', path: '/admin/add-product'});
    res.render('admin/edit-product',{
        pageTitle : 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = (req,res,next)=>{
    //console.log(JSON.parse(JSON.stringify(req.body)));
    const product = new Product(req.body.title,req.body.price,req.body.imageUrl,req.body.description,null,req.user._id);
    product.save()
    .then(r =>{console.log('Created Product');res.redirect('/admin/products');}).catch(err =>{console.log(err)});


};
exports.getEditProduct = (req,res,next)=>{
    
    //res.sendFile(path.join(rootDir,'views','add-product.html'));
    //res.render('add-product',{docTitle : 'Add Product', path: '/admin/add-product'});
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/')
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then(product =>{
        
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product',{
            pageTitle : 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product:product
        });
    }).catch(err => console.log(err));

    

};
exports.postEditProduct = (req,res,next)=>{
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;

    const product = new Product(updatedTitle,updatedPrice,updatedImageUrl,updatedDescription,prodId);
    
    product.save().then(() => {
        console.log('Updated');
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
    


};
exports.getProducts = (req,res,next) =>{
    Product.fetchAll()
    .then(products=>{
        res.render('admin/products',{ 
            prods: products ,
            pageTitle: 'All Products', 
            path:'/products',
    
        });

    }).catch(err => console.log(err));
    

};
exports.postDeleteProduct = (req,res,next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId)
    .then(() => {
        console.log('Destroyed');
        res.redirect('/admin/products');
    }).catch(err => console.log(err));
};