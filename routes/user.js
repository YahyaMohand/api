const express = require('express');
const router =express.Router();
const expressJwt = ('express-jwt')
const { check, validationResult } = require('express-validator');


const {userById ,userProfile,getUserOrders,userAvatar} = require('../controllers/user');

const {isAuth,isAdmin} = require('../controllers/auth')
const {requireSignin} = require('../validators/auth')


router.get('/secret/:userid',requireSignin,isAuth,isAdmin, (req, res)=>{
    res.json({
        user: req.profile
    });
});

router.param('userid', userById)
router.get('/user/:userid',requireSignin,isAuth,userProfile)
router.get('/user/orders/:userid',requireSignin,isAuth,getUserOrders)
router.post('/user/avatar/upload/:userid',requireSignin,isAuth,userAvatar)

module.exports = router;