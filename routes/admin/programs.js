const express = require('express');
const router = express.Router();

const { getPrograms, create, updateProgram, getProgramById,getProgramPageById } = require("../../controllers/admin/programs");

const {isAuth,isAdmin} = require('../../controllers/auth')
const {requireSignin} = require('../../validators/auth')
const {userById} = require('../../controllers/user')


router.get('/programs/:userid',requireSignin,isAuth,isAdmin, getPrograms)
router.post('/programs/create/:userid',requireSignin,isAuth,isAdmin,create)
router.get('/programs/update/:id/:userid',requireSignin,isAuth,isAdmin,getProgramById)
router.put('/programs/update/:id/:userid',requireSignin,isAuth,isAdmin,updateProgram)
router.get('/programs/:id/:userid',requireSignin,isAuth,isAdmin,getProgramPageById)
// router.delete('/groups/delete/:id/:userid',requireSignin,isAuth,isAdmin,deleteGroup)
// router.post('/groups/upload/:userid',requireSignin,isAuth,isAdmin,images);
// router.post('/groups/addproduct/:userid',requireSignin,isAuth,isAdmin,addproducttogroup)

router.param('userid', userById);


module.exports = router;