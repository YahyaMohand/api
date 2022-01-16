const express = require('express');

const router = express.Router();

const {isAuth,isAdmin} = require('../controllers/auth')
// const {requireSignin} = require('../validators/auth')
const {userById} = require('../controllers/user')

//import controllers
const {
    signup,
    signin,
} = require('../controllers/auth');

//import validators from validator folder.
const {userSignupValidator, userSigninValidator, requireSignin} = require('../validators/auth');
const {runValidation} = require('../validators/index')

router.post('/signup', userSignupValidator,runValidation,requireSignin,isAuth,isAdmin,signup);

router.post('/signin', userSigninValidator,runValidation,signin);


router.param('userid', userById);


module.exports = router;