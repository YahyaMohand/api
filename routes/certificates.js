const express = require('express');
const router = express.Router();

const {getCertificatebyId,} = require("../controllers/certificates");


const {isAuth,isAdmin} = require('../controllers/auth')
const {requireSignin} = require('../validators/auth')
const {userById} = require('../controllers/user')

router.get('/certificates/:id',getCertificatebyId);
// router.get('/articles/:id/:userid',requireSignin,isAuth,isAdmin, getArticleId);
// router.put('/articles/update/:id/:userid',requireSignin,isAuth,isAdmin,updateArticle)
// router.delete('/articles/delete/:id/:userid',requireSignin,isAuth,isAdmin,deleteArticale)
// router.post('/articles/create/:userid',requireSignin,isAuth,isAdmin,createArticle);
// router.get('/articles/update/:id/:userid',requireSignin,isAuth,isAdmin, getArticleId);



// router.param('userid', userById);



module.exports = router;