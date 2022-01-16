const express = require('express');
const router = express.Router();

const { getSuccessStories, createStories, getStoryById, updateStory } = require("../../controllers/admin/successstories");

const {isAuth,isAdmin} = require('../../controllers/auth')
const {requireSignin} = require('../../validators/auth')
const {userById} = require('../../controllers/user')

router.get('/successstories/:userid',requireSignin,isAuth,isAdmin,getSuccessStories)
router.post('/successstories/create/:userid',requireSignin,isAuth,isAdmin,createStories)
router.get('/successstories/update/:id/:userid',requireSignin,isAuth,isAdmin,getStoryById)
router.put('/successstories/update/:id/:userid',requireSignin,isAuth,isAdmin,updateStory)
// // router.delete('/stores/delete/:id/:userid',requireSignin,isAuth,isAdmin,deleteStore)
router.get('/successstories/:id/:userid',requireSignin,isAuth,isAdmin,getStoryById)


router.param('userid', userById);

module.exports = router;