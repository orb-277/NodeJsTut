const Product = require('../models/product');
const Order = require('../models/order');

const router = require('../routes/shop');

exports.getProducts = (req,res,next)=>{
    //console.log('hihi'+JSON.stringify(products.products));
    //res.sendFile(path.join(rootDir,'views','shop.html'));

    Product.find().then(products=>{
        res.render('shop/product-list',{ 
            prods: products ,
            pageTitle: 'All Products', 
            path:'/products',
            isAuthenticated:req.session.isLoggedIn
    
        });

    }).catch(err => console.log(err));


    

    
    //('add-product',{docTitle : 'Add Product'})
};
exports.getCart = (req,res,next)=>{
    
    req.user.populate('cart.items.productId')
    .then(user =>{
            
            const products = user.cart.items;

            res.render('shop/cart',{
                pageTitle : 'Cart',
                path: '/cart',
                products: products,
                isAuthenticated:req.session.isLoggedIn
            });
            
        })

    .catch(err=>console.log(err));

};

exports.postCart = (req,res,next) => {
    const prodId = req.body.productId;
    console.log('afasdf'+ prodId);
    Product.findById(prodId).then(product =>{
        req.user.addToCart(product);
        res.redirect('/cart');

    }).then(result => {
        console.log(result);
    })
    // let fetchedCart;
    // let nq = 1;
    // req.user
    // .getCart()
    // .then( cart=>{
    //     fetchedCart = cart;
    //     return cart.getProducts({where:{id:prodId}});
    // })
    // .then(products => {
    //     let product;
    //     if(products.length > 0){
    //         product = products[0];
    //     }

    //     if(product){
    //         const oldqty = product.cartItem.quantity;
    //         nq = oldqty + 1;
    //         return product;


    //     }
    //     return Product.findByPk(prodId);


    // })
    // .then(product => {
    //     return fetchedCart.addProduct(product,{through:{ quantity: nq}});
    // })
    // .then(() => res.redirect('/cart'))
    // .catch(err => console.log(err));
    
};
exports.postCartDeleteProduct = (req,res,next) => {
    const prodId = req.body.productId;
    req.user
    .removefromCart(prodId)
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => {
        console.log(err);
    })
    //res.redirect('/cart');
};
exports.getIndex = (req,res,next)=>{
    
    //res.sendFile(path.join(rootDir,'views','add-product.html'));
    //res.render('add-product',{docTitle : 'Add Product', path: '/admin/add-product'});
    Product.find().then(products=>{
        res.render('shop/index',{ 
            prods: products ,
            pageTitle: 'All Products', 
            path:'/index',
            isAuthenticated:req.session.isLoggedIn
    
        });

    }).catch(err => console.log(err));


};

exports.getCheckout = (req,res,next)=>{
    
    //res.sendFile(path.join(rootDir,'views','add-product.html'));
    //res.render('add-product',{docTitle : 'Add Product', path: '/admin/add-product'});
    res.render('shop/checkout',{
        pageTitle : 'Cart',
        path: '/checkout',
        isAuthenticated:req.session.isLoggedIn
    });
};
exports.postOrder = (req,res,next)=>{
    req.user.populate('cart.items.productId')
    .then(user=>{
        const products = user.cart.items.map(i=>{
            return {quantity: i.quantity,product:{...i.productId._doc}};
        });
        const order = new Order({
            user:{
                name: req.user.name,
                userId: req.user
            },
            products: products
        });
        return order.save();
    })
    .then(result => {
        return req.user.clearCart();
        
    })
    .then(() =>{
        res.redirect('/orders');
    })
    .catch(err=>console.log(err))
}
exports.getOrders = (req,res,next)=>{
    
    //res.sendFile(path.join(rootDir,'views','add-product.html'));
    //res.render('add-product',{docTitle : 'Add Product', path: '/admin/add-product'});
    Order.find({"user.userId": req.user._id})
    .then(orders => {
        res.render('shop/orders',{
            pageTitle : 'Orders',
            path: '/orders',
            orders: orders,
            isAuthenticated:req.session.isLoggedIn
        });

    })
    .catch(err =>{
        console.log(err);
    })


};
exports.getProduct = (req,res,next)=>{
    const prodId = req.params.productId;
    //console.log(prodId);
    
    Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products',
        isAuthenticated:req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
   


    //res.redirect('/');
};
