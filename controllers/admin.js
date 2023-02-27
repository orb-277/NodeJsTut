// const mongodb = require('mongodb');
const Product = require('../models/product');

//const ObjectId = mongodb.ObjectId;
exports.getAddProduct = (req,res,next)=>{
    
    //res.sendFile(path.join(rootDir,'views','add-product.html'));
    //res.render('add-product',{docTitle : 'Add Product', path: '/admin/add-product'});
    res.render('admin/edit-product',{
        pageTitle : 'Add Product',
        path: '/admin/add-product',
        editing: false,
        isAuthenticated:req.session.isLoggedIn
    });
};

exports.postAddProduct = (req,res,next)=>{
    //console.log(JSON.parse(JSON.stringify(req.body)));
    const product = new Product({title:req.body.title,price:req.body.price,imageUrl:req.body.imageUrl,description:req.body.description,userId:req.user._id});
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
            product:product,
            isAuthenticated:req.session.isLoggedIn
        });
    }).catch(err => console.log(err));

    

};
exports.postEditProduct = (req,res,next)=>{
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;

    Product.findById(prodId).then(product => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.imageUrl = updatedImageUrl;
        product.description = updatedDescription;
        return product.save()
    })
    .then(() => {
        console.log('Updated');
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
    


};
exports.getProducts = (req,res,next) =>{
    Product.find()
    //.populate('userId')
    .then(products=>{
        res.render('admin/products',{ 
            prods: products ,
            pageTitle: 'All Products', 
            path:'/products',
            isAuthenticated:req.session.isLoggedIn
    
        });

    }).catch(err => console.log(err));
    

};
exports.postDeleteProduct = (req,res,next) => {
    const prodId = req.body.productId;
    Product.findByIdAndRemove(prodId)
    .then(() => {
        console.log('Destroyed');
        res.redirect('/admin/products');
    }).catch(err => console.log(err));
};