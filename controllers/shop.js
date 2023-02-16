const Product = require('../models/product');

const router = require('../routes/shop');

exports.getProducts = (req,res,next)=>{
    //console.log('hihi'+JSON.stringify(products.products));
    //res.sendFile(path.join(rootDir,'views','shop.html'));

    Product.fetchAll().then(products=>{
        res.render('shop/product-list',{ 
            prods: products ,
            pageTitle: 'All Products', 
            path:'/products',
    
        });

    }).catch(err => console.log(err));


    

    
    //('add-product',{docTitle : 'Add Product'})
};
exports.getCart = (req,res,next)=>{
    
    req.user.getCart()
    .then(products =>{

            res.render('shop/cart',{
                pageTitle : 'Cart',
                path: '/cart',
                products: products
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
    req.user.getCart()
    .then(cart => {
        return cart.getProducts({ where: {id:prodId}});
    })
    .then(products => {
        const product = products[0];
        return product.cartItem.destroy();
    })
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
    Product.fetchAll().then(products=>{
        res.render('shop/index',{ 
            prods: products ,
            pageTitle: 'All Products', 
            path:'/index',
    
        });

    }).catch(err => console.log(err));


};

exports.getCheckout = (req,res,next)=>{
    
    //res.sendFile(path.join(rootDir,'views','add-product.html'));
    //res.render('add-product',{docTitle : 'Add Product', path: '/admin/add-product'});
    res.render('shop/checkout',{
        pageTitle : 'Cart',
        path: '/checkout'
    });
};
exports.postOrder = (req,res,next)=>{
    let fetchedCart;
    req.user.getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts();
    })
    .then(products => {
        return req.user.createOrder()
        .then(order => {
            return order.addProducts
            (products.map(product => {
                product.orderItem = {quantity: product.cartItem.quantity};
                return product;
            }))
        })
        .catch(err => console.log(err));
        
    })
    .then(result => {
        return fetchedCart.setProducts(null);
        
    })
    .then(result => {
        
        res.redirect('/orders');
    })
    .catch(err=>console.log(err))
}
exports.getOrders = (req,res,next)=>{
    
    //res.sendFile(path.join(rootDir,'views','add-product.html'));
    //res.render('add-product',{docTitle : 'Add Product', path: '/admin/add-product'});
    req.user
    .getOrders({include:['products']})
    .then(orders => {
        res.render('shop/orders',{
            pageTitle : 'Orders',
            path: '/orders',
            orders: orders
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
        path: '/products'
      });
    })
    .catch(err => console.log(err));
   


    //res.redirect('/');
};
