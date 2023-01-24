//const path = require('path');
const express = require('express');
const router = express.Router();
//const rootDir = require('../util/path');

const shopContoller = require('../controllers/shop');
router.get('/',shopContoller.getIndex);
router.get('/products',shopContoller.getProducts);
// router.get('/cart',shopContoller.getCart);
router.post('/cart',shopContoller.postCart);
// router.post('/cart-delete-item',shopContoller.postCartDeleteProduct);
// router.post('/create-order',shopContoller.postOrder);
// router.get('/checkout',shopContoller.getCheckout);
// router.get('/orders',shopContoller.getOrders);
router.get('/products/:productId',shopContoller.getProduct);


module.exports = router;