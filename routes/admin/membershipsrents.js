const express = require('express');
const router = express.Router();

const { createMembership, updateMembershiprent, getMemrentById, getMemrents, addPeopletomemship, getPeoplebyid,updateMemPeople } = require("../../controllers/admin/membershipsrents");

const {isAuth,isAdmin} = require('../../controllers/auth')
const {requireSignin} = require('../../validators/auth')
const {userById} = require('../../controllers/user')



router.post('/membershipsrent/create/:userid',requireSignin,isAuth,isAdmin,createMembership)
// router.get('/subcategories/create/:userid',requireSignin,isAuth,isAdmin,addSubCate)
router.post('/membershipsrent/membershipsrentcommunity/:id/:userid',requireSignin,isAuth,isAdmin,addPeopletomemship)
// router.get('/classcategories/create/:userid',requireSignin,isAuth,isAdmin,addClassCate)
// router.post('/classcategories/create/:userid',requireSignin,isAuth,isAdmin,createClassCate)
router.get('/membershipsrent/:userid', requireSignin,isAuth,isAdmin,getMemrents)
router.put('/membershipsrent/update/:id/:userid',requireSignin,isAuth,isAdmin,updateMembershiprent)
router.get('/membershipsrent/:id/:userid',requireSignin,isAuth,isAdmin,getMemrentById)
router.get('/membershipsrent/update/:id/:userid',requireSignin,isAuth,isAdmin,getMemrentById)
router.put('/membershipsrent/membershipsrentcommunity/update/:id/:userid',requireSignin,isAuth,isAdmin,updateMemPeople)
router.get('/membershipsrent/membershipsrentcommunity/update/:id/:userid',requireSignin,isAuth,isAdmin,getPeoplebyid)
// // router.delete('/subcategories/delete/:id/:userid',requireSignin,isAuth,isAdmin,deleteSubCate)
// router.get('/classcategories/:id/:userid',requireSignin,isAuth,isAdmin,getClassCateById)
// router.put('/classcategories/update/:id/:userid',requireSignin,isAuth,isAdmin,updateClassCate)
// // router.delete('/classcategories/delete/:id/:userid',requireSignin,isAuth,isAdmin,deleteClassCate)
// router.post('/categories/upload/:userid',requireSignin,isAuth,isAdmin,images);


router.param('userid', userById);

module.exports = router;