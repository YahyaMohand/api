const {check, validationResult} = require('express-validator');
const expressJwt = require('express-jwt');

exports.userSignupValidator = [
    check('user_name').not().isEmpty().withMessage('Please enter your user_name'),
    check('user_email').not().isEmpty().isEmail().withMessage('Please enter your Email'),
    check('password').not().isEmpty().withMessage('Please enter your password'),
    check('password').isLength({min: 5}).withMessage('Please enter password more than 5 char'), 
];

exports.userSigninValidator = [
    check('user_email').not().isEmpty().isEmail().withMessage('Please enter your email'),
    check('user_password').not().isEmpty().withMessage('Please enter your password'),
    check('user_password').isLength({min: 6}).withMessage('Please enter password more than 6 char'),
    
];

//require singin middle wear fro security and orginization
// //required signin method
exports.requireSignin = [
    expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"})
]