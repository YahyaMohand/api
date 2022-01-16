const express = require('express');
const router = express.Router();

const { getProducts, create, getProductById, updateProduct,images } = require("../../controllers/admin/products");


const {isAuth,isAdmin} = require('../../controllers/auth')
const {requireSignin} = require('../../validators/auth')
const {userById} = require('../../controllers/user')


router.get('/products/:userid',requireSignin,isAuth,isAdmin, getProducts)
 router.post('/products/create/:userid',requireSignin,isAuth,isAdmin,create);
 router.get('/products/update/:id/:userid',requireSignin,isAuth,isAdmin,getProductById)
router.put('/products/update/:id/:userid',requireSignin,isAuth,isAdmin,updateProduct)

router.get('/products/:id/:userid',requireSignin,isAuth,isAdmin, getProductById)
router.post('/products/upload/:userid',requireSignin,isAuth,isAdmin,images);


router.param('userid', userById);


module.exports = router;