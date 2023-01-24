const path = require('path');
const express = require('express');
const router = express.Router();
//const rootDir = require('../util/path');
const adminContoller = require('../controllers/admin');


router.get('/add-product',adminContoller.getAddProduct);
router.get('/products',adminContoller.getProducts);
router.post('/add-product',adminContoller.postAddProduct);
router.get('/edit-product/:productId',adminContoller.getEditProduct);
router.post('/edit-product',adminContoller.postEditProduct);
router.post('/delete-product',adminContoller.postDeleteProduct);
module.exports = router;

