const mysql = require('mysql');
var dbconnect = require('../../dbconnect');
var con = mysql.createConnection(dbconnect.connection);



// //upload images of carousel
// exports.images = (req, res) => {
//     // console.log('request@@@@@#$$$##$#$', req.files)
//     if(req.files === null){
//         return res.status(400).json({
//             massage: 'No file uploaded'
//         })
//     }else{
//         const file = req.files.file;
//         file.name = Date.now()+file.name
//         // console.log(file)
//         // console.log('reached else state')
//         file.mv(`public/uploads/carousel/${file.name}`,err =>{
//             if(err){
//                 // console.error('upload error@@@@@@@@@@@', err);
//                 return res.status(500).send(err);
//             }
    
//             res.json({fileName: file.name, filePath: `/uploads/carousel/${file.name}`});
//         });
//     }

// }

// //delete carousel from database by id
// exports.deleteCarousel = (req,res,next) =>{
//     carouselid = req.params.id
//     // console.log('delete request reached')
//     con.query('DELETE FROM carousel WHERE carouselid = ?',[carouselid], function(err,result){
//         if(err){
//             // console.log(err)
//             res.status(400).json({
//                 error : err
//             });
//         }else{
//             // console.log('reached success deletewed')
//             res.status(200).json({
//                 message: 'carousel deleted successfully'
//             })
//         }
//     })
// }


//update carousel information by id 
exports.updateProgram = (req, res) =>{
    updatePrograme = {
        program_name: req.body.program_name,
        program_drivelink: req.body.program_drivelink,
        program_startdate: req.body.program_startdate,
        program_enddate: req.body.program_enddate,
        program_donor: req.body.program_donor,
        program_description:req.body.program_description,
        program_objectives:req.body.program_objectives,
        program_activities:req.body.program_activities,
        program_goals: req.body.program_goals,
        program_beneficiaries: req.body.program_beneficiaries,
        program_editedby:req.params.userid,
    }
    con.query('UPDATE programs SET ? WHERE programid = ?',[updatePrograme, req.params.id],
    function(err,result){
        if(err){
            // console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'programs updated successfully'
            })
        }
    })
}



//get one carousel by id 
exports.getProgramById = (req, res) =>{
    programs = []
    con.query(`SELECT * FROM programs WHERE programid = ?`,[req.params.id], function(err, rows, fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            programs = rows[0]
            res.status(200).json({
                programs
            })
        }
    })
}



//get programm by id page with statistics
exports.getProgramPageById = (req, res) =>{
    programid=req.params.id
    programs = []
    events={}
    eventsapplied={}
    eventapproved={}
    eventattended={}
    trainings={}
    trainingapplied={}
    trainingsapproved={}
    trainingsattended={}
    trainingspassed={}
    con.query(`SELECT * FROM programs WHERE programid = ?`,[programid], function(err, rows, fields){
        if(err){console.log('error sql 1111111',err)
            res.status(400).json({
                error : err
            });
        }else{
            programs = rows[0]
            con.query(`SELECT COUNT(*) AS events FROM events WHERE programid = ?`,[programid],function(err,rows,fields){
                if(err){console.log(err)
                    res.status(400).json({
                        error : err
                    });
                }else{
                    events=rows[0]
                    con.query(`SELECT COUNT(*) AS eventsapplied FROM community LEFT JOIN eventattendees ON community.communityid = eventattendees.communityid LEFT JOIN events ON events.eventid = eventattendees.eventid WHERE events.programid = ? AND eventattendees.event_att_applied = ?`,[programid,1],function(err,rows,fields){
                        if(err){console.log(err)
                            res.status(400).json({
                                error : err
                            });
                        }else{
                            eventsapplied=rows[0]
                            con.query(`SELECT COUNT(*) AS eventapproved FROM community LEFT JOIN eventattendees ON community.communityid = eventattendees.communityid LEFT JOIN events ON events.eventid = eventattendees.eventid WHERE events.programid = ? AND eventattendees.event_att_approved = ?`,[programid,1],function(err,rows,fields){
                                if(err){console.log(err)
                                    res.status(400).json({
                                        error : err
                                    });
                                }else{
                                    eventapproved=rows[0]
                                    con.query(`SELECT COUNT(*) AS eventattended FROM community LEFT JOIN eventattendees ON community.communityid = eventattendees.communityid LEFT JOIN events ON events.eventid = eventattendees.eventid WHERE events.programid = ? AND eventattendees.event_att_attended = ?`,[programid,1],function(err,rows,fields){
                                        if(err){console.log(err)
                                            res.status(400).json({
                                                error : err
                                            });
                                        }else{
                                            eventattended=rows[0]
                                            con.query(`SELECT COUNT(*) AS trainings FROM trainings WHERE programid = ?`,[programid],function(err,rows,fields){
                                                if(err){console.log(err)
                                                    res.status(400).json({
                                                        error : err
                                                    });
                                                }else{
                                                    trainings=rows[0]
                                                    con.query(`SELECT COUNT(*) AS trainingapplied FROM community LEFT JOIN trainingsstudents ON community.communityid = trainingsstudents.communityid LEFT JOIN trainings ON trainings.trainingid = trainingsstudents.trainingid WHERE trainings.programid = ? AND trainingsstudents.student_applied = ?`,[programid,1],function(err,rows,fields){
                                                        if(err){console.log(err)
                                                            res.status(400).json({
                                                                error : err
                                                            });
                                                        }else{
                                                            trainingapplied=rows[0]
                                                            con.query(`SELECT COUNT(*) AS trainingsapproved FROM community LEFT JOIN trainingsstudents ON community.communityid = trainingsstudents.communityid LEFT JOIN trainings ON trainings.trainingid = trainingsstudents.trainingid WHERE trainings.programid = ? AND trainingsstudents.student_approved = ?`,[programid,1],function(err,rows,fields){
                                                                if(err){console.log(err)
                                                                    res.status(400).json({
                                                                        error : err
                                                                    });
                                                                }else{
                                                                    trainingsapproved=rows[0]
                                                                    con.query(`SELECT COUNT(*) AS trainingsattended FROM community LEFT JOIN trainingsstudents ON community.communityid = trainingsstudents.communityid LEFT JOIN trainings ON trainings.trainingid = trainingsstudents.trainingid WHERE trainings.programid = ? AND trainingsstudents.student_attended = ?`,[programid,1],function(err,rows,fields){
                                                                        if(err){console.log(err)
                                                                            res.status(400).json({
                                                                                error : err
                                                                            });
                                                                        }else{
                                                                            trainingsattended=rows[0]
                                                                            con.query(`SELECT COUNT(*) AS trainingspassed FROM community LEFT JOIN trainingsstudents ON community.communityid = trainingsstudents.communityid LEFT JOIN trainings ON trainings.trainingid = trainingsstudents.trainingid WHERE trainings.programid = ? AND trainingsstudents.student_passed = ?`,[programid,1],function(err,rows,fields){
                                                                                if(err){console.log(err)
                                                                                    res.status(400).json({
                                                                                        error : err
                                                                                    });
                                                                                }else{
                                                                                    trainingspassed=rows[0]
                                                                                    res.status(200).json({
                                                                                        programs,events,eventsapplied,eventapproved,eventattended,trainings,trainingapplied,trainingsapproved,trainingsattended,trainingspassed
                                                                                    })
                                                                                    
                                                                                }})
                                                                        }})
                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                
                                    })
                                }
                                
                            })
                        }

                    })
                }
            })
        }
    })
}

//##########################


//view programs in admin dashbored
exports.getPrograms = (req, res) => {
    programs = []
    con.query('SELECT * from programs', function(err,rows,fields){
        if(err){
            res.status(400).json({
                massage : err
            });
        }else{
            programs = rows
            res.status(200).json({
                programs
            })
        }
    })
}



// //create carousel
exports.create = (req, res) => {
    
    createProgram = {
        program_name: req.body.program_name,
        program_drivelink: req.body.program_drivelink,
        program_startdate: req.body.program_startdate,
        program_enddate: req.body.program_enddate,
        program_donor: req.body.program_donor,
        program_description:req.body.program_description,
        program_objectives:req.body.program_objectives,
        program_activities:req.body.program_activities,
        program_goals: req.body.program_goals,
        program_beneficiaries: req.body.program_beneficiaries,
        program_editedby:req.params.userid,
        program_createdby:req.params.userid,
    }
    con.query('INSERT INTO programs SET ?',
    [createProgram],
    function(err, result){
        if(err){
            console.log("ERROR IN ADDING program", err)
            res.status(400).json({
                massage : err
            });
            return;
        }else{
            res.status(200).json({
                message : 'program ADDED TO DATABASE'
            })
            return;
        }
    });
    
};