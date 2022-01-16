const express = require('express');
const router = express.Router();

const { getStartups, create, addStartupTeam, getStartupById, updateStartup,getStartupByIdPage,
    updateStartupTeam, } = require("../../controllers/admin/startups");


const {isAuth,isAdmin} = require('../../controllers/auth')
const {requireSignin} = require('../../validators/auth')
const {userById} = require('../../controllers/user')



router.get('/startups/:userid',requireSignin,isAuth,isAdmin, getStartups)
router.post('/startups/create/:userid',requireSignin,isAuth,isAdmin,create)
router.get('/startups/update/:id/:userid',requireSignin,isAuth,isAdmin,getStartupById)
router.put('/startups/update/:id/:userid',requireSignin,isAuth,isAdmin,updateStartup)
router.get('/startups/:id/:userid',requireSignin,isAuth,isAdmin,getStartupByIdPage)
// router.delete('/startup/delete/:id/:userid',requireSignin,isAuth,isAdmin,deleteLogistics)
router.post('/startups/addteam/:id/:userid',requireSignin,isAuth,isAdmin,addStartupTeam);
router.put('/startups/updateteam/:id/:userid',requireSignin,isAuth,isAdmin,updateStartupTeam)


router.param('userid', userById);



module.exports = router;