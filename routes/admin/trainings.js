const express = require('express');
const router = express.Router();

const { getTrainings, create, getTrainingById, updateTraining,UpdateStudent,createCertificate,addarrayStudent,addarrayInstructors,
    getTrainingStudent,
    createStudent,
    createInstractor, } = require("../../controllers/admin/trainings");


const { isAuth, isAdmin } = require('../../controllers/auth')
const { requireSignin } = require('../../validators/auth')
const { userById } = require('../../controllers/user')


// router.post('/boothorders/:userid',requireSignin,isAuth,isAdmin,usdiqdmiddleware,Boothordersubmit)
router.get('/trainings/:userid', requireSignin, isAuth, isAdmin, getTrainings)
router.post('/trainings/create/:userid', requireSignin, isAuth, isAdmin, create)
// router.get('/orders/supplier/:orderid/:userid',requireSignin,isAuth,isAdmin,usdiqdmiddleware,getSupplierOrderByID)
router.get('/trainings/update/:id/:userid', requireSignin, isAuth, isAdmin, getTrainingById)
router.put('/trainings/update/:id/:userid', requireSignin, isAuth, isAdmin, updateTraining)
router.get('/trainings/:id/:userid', requireSignin, isAuth, isAdmin, getTrainingById)
router.post('/trainings/addarraystudent/:id/:userid', requireSignin, isAuth, isAdmin,addarrayStudent)
router.post('/trainings/addarrayinstructor/:id/:userid', requireSignin, isAuth, isAdmin,addarrayInstructors)
// router.patch('/orders/update/:orderid/:userid',requireSignin,isAuth,isAdmin,updateOrderStatus)
// router.patch('/orders/cancel/:orderid/:userid',requireSignin,isAuth,isAdmin,cancelOrder)
// // router.get('/orders/suppliers/list/:userid',supplierlist)
router.get('/trainingstudents/:id/:userid',requireSignin,isAuth,isAdmin,getTrainingStudent)
router.patch('/trainingstudents/update/:id/:userid',requireSignin,isAuth,isAdmin,UpdateStudent)
router.post('/certificates/addcertificate/:userid', requireSignin, isAuth, isAdmin, createCertificate)
router.post('/trainings/addstudent/:id/:userid', requireSignin, isAuth, isAdmin, createStudent)
router.post('/trainings/addinstructor/:id/:userid', requireSignin, isAuth, isAdmin, createInstractor)

router.param('userid', userById);



module.exports = router;