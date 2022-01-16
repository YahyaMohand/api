const express = require('express');
const router = express.Router();

const { getServices, createService, getServiceById, updateService, serviceFile } = require("../../controllers/admin/services");


const {isAuth,isAdmin} = require('../../controllers/auth')
const {requireSignin} = require('../../validators/auth')
const {userById} = require('../../controllers/user')


router.get('/services/:userid',requireSignin,isAuth,isAdmin, getServices)
router.get('/services/:id/:userid',requireSignin,isAuth,isAdmin, getServiceById)
router.post('/services/create/:userid',requireSignin,isAuth,isAdmin,createService)
router.put('/services/update/:id/:userid',requireSignin,isAuth,isAdmin,updateService)
router.get('/services/update/:id/:userid',requireSignin,isAuth,isAdmin,getServiceById)
// // router.delete('/cities/delete/:id/:userid',requireSignin,isAuth,isAdmin,deleteCity)
router.post('/services/upload/:userid',requireSignin,isAuth,isAdmin,serviceFile);


router.param('userid', userById);



module.exports = router;