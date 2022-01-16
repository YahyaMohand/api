const express = require('express');
const router = express.Router();

const {createEvent,getAllProgramslist,getEventAttendees,getEvents,updateEvent,getEventById,addarrayAttendee
    ,getEventTree, addarraySpeakers,UpdateAttendee,createEvents, createSpeaker, createAttendee} = require("../../controllers/admin/events");

const {isAuth,isAdmin} = require('../../controllers/auth')
const {requireSignin} = require('../../validators/auth')
const {userById} = require('../../controllers/user')


router.get('/events/:userid',requireSignin,isAuth,isAdmin, getEvents)
router.post('/events/create/:userid',requireSignin,isAuth,isAdmin,createEvents)
router.get('/events/update/:id/:userid',requireSignin,isAuth,isAdmin,getEventById)
router.put('/events/update/:id/:userid',requireSignin,isAuth,isAdmin,updateEvent)
router.get('/events/:id/:userid',requireSignin,isAuth,isAdmin,getEventTree)
// // router.delete('/brands/delete/:id/:userid',requireSignin,isAuth,isAdmin,deleteBrand)
// router.post('/brands/upload/:userid',requireSignin,isAuth,isAdmin,images);
router.post('/events/addarrayattendee/:id/:userid',requireSignin,isAuth,isAdmin,addarrayAttendee)
router.post('/events/addarrayspeakers/:id/:userid',requireSignin,isAuth,isAdmin,addarraySpeakers)
router.get('/eventattendees/:id/:userid',requireSignin,isAuth,isAdmin,getEventAttendees)
router.patch('/eventattendees/update/:id/:userid',requireSignin,isAuth,isAdmin,UpdateAttendee)
router.post('/events/addspeaker/:id/:userid',requireSignin,isAuth,isAdmin,createSpeaker)
router.post('/events/addattendee/:id/:userid',requireSignin,isAuth,isAdmin,createAttendee)

router.param('userid', userById);


module.exports = router;