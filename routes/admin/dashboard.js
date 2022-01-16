const express = require('express');
const router = express.Router();

const {staticdashboard, dynamicparameters} = require("../../controllers/admin/dashboard");


const {isAuth,isAdmin} = require('../../controllers/auth')
const {requireSignin} = require('../../validators/auth')
const {userById} = require('../../controllers/user')



// router.put('/updateusd/:userid',requireSignin,isAuth,isAdmin,updateusd)
// router.delete('/cities/delete/:id/:userid',requireSignin,isAuth,isAdmin,deleteCity)
// router.get('/staticdashboard/:start/:end/:userid',requireSignin,isAuth,isAdmin,staticdashboard)
// router.get('/dynamicparameters/:userid',requireSignin,isAuth,isAdmin,dynamicparameters)

router.param('userid', userById);



module.exports = router;