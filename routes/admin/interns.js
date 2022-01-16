const express = require('express');
const router = express.Router();

const { getInterns, createIntern, getInternById, updateInterns } = require("../../controllers/admin/interns");

const {isAuth,isAdmin} = require('../../controllers/auth')
const {requireSignin} = require('../../validators/auth')
const {userById} = require('../../controllers/user')


router.get('/interns/:userid',requireSignin,isAuth,isAdmin, getInterns)
router.post('/interns/create/:userid',requireSignin,isAuth,isAdmin,createIntern)
router.get('/interns/update/:id/:userid',requireSignin,isAuth,isAdmin,getInternById)
router.put('/interns/update/:id/:userid',requireSignin,isAuth,isAdmin,updateInterns)
router.get('/interns/:id/:userid',requireSignin,isAuth,isAdmin,getInternById)
// // router.delete('/carousel/delete/:id/:userid',requireSignin,isAuth,isAdmin,deleteCarousel)
// router.post('/carousel/upload/:userid',requireSignin,isAuth,isAdmin,images);

router.param('userid', userById);


module.exports = router;