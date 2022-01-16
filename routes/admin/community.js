const express = require('express');
const router = express.Router();

const {imagesCommunity,createCommunity,updateCommunity,getCommunityAll,deleteCommunity,getCommunityById,addarrayCommunity
    ,onePersonTrace,communityList
} = require("../../controllers/admin/community");

// const { usdiqdmiddleware} = require("../controllers/products");

const {isAuth,isAdmin} = require('../../controllers/auth')
const {requireSignin} = require('../../validators/auth')
const {userById} = require('../../controllers/user')


router.get('/community/:userid',requireSignin,isAuth,isAdmin,getCommunityAll)
router.get('/community/list/:userid',requireSignin,isAuth,isAdmin,communityList)
router.post('/community/add/:userid',requireSignin,isAuth,isAdmin,createCommunity)
router.put('/community/update/:id/:userid',requireSignin,isAuth,isAdmin,updateCommunity)
router.get('/community/update/:id/:userid',requireSignin,isAuth,isAdmin,getCommunityById)
router.post('/community/addarray',requireSignin,isAuth,isAdmin,addarrayCommunity)
router.get('/community/trace/:id/:userid',onePersonTrace)
// router.get('/classcategories/:subcateid', getClassCate)
// router.get('/products/main/:categoryid',usdiqdmiddleware,getMainProducts)
// router.get('/products/sub/:subcateid',usdiqdmiddleware,getSubProducts)
// router.get('/products/class/:classcateid',usdiqdmiddleware,getClassProducts)
// router.get('/products/classlimit/:classcateid',usdiqdmiddleware,getClassLimitProducts)
// router.get('/subandclass/:categoryid',getSubandClass)


router.param('userid', userById);

module.exports = router;