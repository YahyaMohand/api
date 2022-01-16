const express = require('express');
const router = express.Router();

const { getRecommandation, createRecommandation, getRecommandationById, updateRecommendation } = require("../../controllers/admin/recommandations");


const {isAuth,isAdmin} = require('../../controllers/auth')
const {requireSignin} = require('../../validators/auth')
const {userById} = require('../../controllers/user')



router.get('/recommendations/:userid',requireSignin,isAuth,isAdmin, getRecommandation)
router.post('/recommendations/create/:userid',requireSignin,isAuth,isAdmin,createRecommandation)
router.get('/recommendations/update/:id/:userid',requireSignin,isAuth,isAdmin,getRecommandationById)
router.put('/recommendations/update/:id/:userid',requireSignin,isAuth,isAdmin,updateRecommendation)
router.get('/recommendations/:id/:userid',requireSignin,isAuth,isAdmin,getRecommandationById)
// // router.delete('/hr/delete/:id/:userid',requireSignin,isAuth,isAdmin,deleteHR)
// router.post('/hr/upload/:userid',requireSignin,isAuth,isAdmin,imagesHR);
// // contracts
// router.get('/contracts/:userid',requireSignin,isAuth,isAdmin, getContracts)
// router.post('/contracts/create/:userid',requireSignin,isAuth,isAdmin,createContract)
// router.get('/contracts/:id/:userid',requireSignin,isAuth,isAdmin,getContractById)
// router.put('/contracts/update/:id/:userid',requireSignin,isAuth,isAdmin,updateContract)
// // router.delete('/contracts/delete/:id/:userid',requireSignin,isAuth,isAdmin,deleteContract)

router.param('userid', userById);



module.exports = router;