const express = require('express');
const router = express.Router();

const {imagesArticle,updateArticle,createArticle,deleteArticale,getArticleId,} = require("../../controllers/admin/articles");


const {isAuth,isAdmin} = require('../../controllers/auth')
const {requireSignin} = require('../../validators/auth')
const {userById} = require('../../controllers/user')

router.post('/articles/upload/:userid',requireSignin,isAuth,isAdmin,imagesArticle);
router.get('/articles/:id/:userid',requireSignin,isAuth,isAdmin, getArticleId);
router.put('/articles/update/:id/:userid',requireSignin,isAuth,isAdmin,updateArticle)
router.delete('/articles/delete/:id/:userid',requireSignin,isAuth,isAdmin,deleteArticale)
router.post('/articles/create/:userid',requireSignin,isAuth,isAdmin,createArticle);
router.get('/articles/update/:id/:userid',requireSignin,isAuth,isAdmin, getArticleId);



router.param('userid', userById);



module.exports = router;