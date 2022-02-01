const mysql = require('mysql');
var dbconnect = require('../../dbconnect');
var con = mysql.createConnection(dbconnect.connection);
var jwt = require('jsonwebtoken');

// //upload images of trainings
// exports.images = (req, res) => {
//     // console.log('request@@@@@#$$$##$#$', req.files)
//     if(req.files === null){
//         return res.status(400).json({
//             massage: 'No file uploaded'
//         })
//     }else{
//         const file = req.files.file;
//         file.name = Date.now()+file.name
//         console.log(file)
//         console.log('reached else state')
//         file.mv(`public/uploads/brands/${file.name}`,err =>{
//             if(err){
//                 // console.error('upload error@@@@@@@@@@@', err);
//                 return res.status(500).send(err);
//             }
    
//             res.json({fileName: file.name, filePath: `/uploads/brands/${file.name}`});
//         });
//     }

// }

// //delete city from database by id
// exports.deleteBrand = (req,res) =>{
//     console.log('delete request reached')
//     con.query('DELETE FROM brands WHERE brandid = ?',[req.params.id], function(err,result){
//         if(err){
//             console.log(err)
//             res.status(400).json({
//                 error : err
//             });
//         }else{
//             res.status(200).json({
//                 message: 'brand deleted successfully'
//             })
//         }
//     })
// }


// adding students to the training
exports.addarrayStudent = (req,res,next)=>{
    console.log('reached controller')
    console.log(req.params.id)
    trainingid=req.params.id
    studentArray = req.body;
    console.log(studentArray)
    const foundedEmails = [];
    for(let i=0;i<studentArray.length;i++){
        con.query('SELECT * FROM community WHERE com_email_1 = ? OR com_email_2 = ?',[studentArray[i].com_email_1,studentArray[i].com_email_2],function(err,rows,fields){
            // console.log('rows up', rows.length)
            if(err){
                res.status(404).json({
                    error: err
                })
            }else{
                // console.log(rows.length)
                if(rows.length !== 0){
                    trainingSet ={
                        communityid: rows[0].communityid,
                        trainingid: trainingid,
                    }
                    con.query('INSERT INTO trainingsstudents SET ?',[trainingSet],function(err,result){
                        if(err){
                            console.log(err)
                        }
                    })
                }if (rows.length===0) {
                    con.query('INSERT INTO community SET ?',[studentArray[i]],function(err, result){
                        // console.log('result',result)
                        if(err){
                            console.log('error in insert',err)
                        }else{
                            trainingSet ={
                                communityid: result.insertId,
                                trainingid: trainingid,
                            }
                            con.query('INSERT INTO trainingsstudents SET ?',[trainingSet],function(err,result){
                                if(err){
                                    console.log(err)
                                }
                               
                            })
                        }
                    })
                } else {
                    foundedEmails.push(`${studentArray[i].com_email_1} or ${studentArray[i].com_email_2} is found`)
                }
                
                if (i === studentArray.length - 1) {
                    if (foundedEmails.length === 0) {

                        res.status(200).json({
                            message: 'The process has  done successfuly'
                        })
                    } else {
                        res.status(400).json({
                            message: 'Some E-mail duplicated and other E-mail has inserted'
                        })
                    }
                }  
            }
        })
    }
    
}



// adding students to the training
exports.addarrayInstructors = (req,res,next)=>{
    console.log('reached controller')
    console.log(req.params.id)
    trainingid=req.params.id
    instructorArray = req.body;
    for(let i=0;i<instructorArray.length;i++){
        con.query('SELECT * FROM community WHERE com_email_1 = ? OR com_email_2 = ?',[instructorArray[i].com_email_1,instructorArray[i].com_email_1],function(err,rows,fields){
            // console.log('rows up', rows.length)
            if(err){
                res.status(404).json({
                    error: err
                })
            }else{
                // console.log(rows.length)
                if(rows.length !== 0){
                    trainingSet ={
                        communityid: rows[0].communityid,
                        trainingid: trainingid,
                    }
                    con.query('INSERT INTO traininginstructors SET ?',[trainingSet],function(err,result){
                        if(err){
                            console.log(err)
                        }
                    })
                }else{
                    con.query('INSERT INTO community SET ?',[instructorArray[i]],function(err, result){
                        // console.log('result',result)
                        if(err){
                            console.log('error in insert',err)
                        }else{
                            trainingSet ={
                                communityid: result.insertId,
                                trainingid: trainingid,
                            }
                            con.query('INSERT INTO traininginstructors SET ?',[trainingSet],function(err,result){
                                if(err){
                                    console.log(err)
                                }
                            })
                        }
                    })
                }
                if(i===instructorArray.length-1){
                    res.status(200).json({
                        message: 'The process has  done successfuly'
                    })
                }   
            }
        })
    }
    
}


//update training information by id 
exports.updateTraining = (req, res) =>{
    updateTraining = {
        train_title: req.body.train_title,
        train_description: req.body.train_description,
        train_startdate: req.body.train_startdate,
        train_enddate: req.body.train_enddate,
        train_durationdays: req.body.train_durationdays,
        train_durationshours: req.body.train_durationshours,
        train_price: req.body.train_price,
        train_modality: req.body.train_modality,
        train_formlink: req.body.train_formlink,
        train_type: req.body.train_type
    }
    con.query('UPDATE trainings SET ? WHERE trainingid = ?',[updateTraining, req.params.id],
    function(err,result){
        if(err){
            console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'Training has been updated'
            })
        }
    })
}

//update student status
exports.UpdateStudent = (req,res)=>{
    studentid = req.params.id
    updatestatus=req.body
    con.query('UPDATE trainingsstudents SET ? WHERE trainingsstudentid = ?',[updatestatus,studentid],function(err,result){
        if(err){
            console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'Status has been updated'
            })
        }
    })

}


//add certificate
exports.createCertificate=(req,res)=>{
    // console.log(req.body)
    userid=req.params.userid
    certificateset={
        communityid: req.body.communityid,
        trainingid: req.body.trainingid,
        certificate_score: req.body.certificate_score,
        certificate_createdby:userid,
        certificate_editedby:userid,
    }
    con.query(`INSERT INTO certificates SET ?`,[certificateset],function(err,result){
        if(err){
            console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'Certificate has been updated'
            })
        }
    })
}
//get training students by id
exports.getTrainingStudent = (req,res)=>{
    trainingid=req.params.id
    students = []
    con.query(`SELECT * FROM community LEFT JOIN trainingsstudents ON community.communityid = trainingsstudents.communityid WHERE trainingsstudents.trainingid = ?`
    ,[trainingid],function(err,rows,fields){
        if(err){console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            students=rows
            res.status(200).json({
                students
            })
        }
    })
}

//get one training by id 
exports.getTrainingById = (req, res) =>{

    // console.log('yeah this is it @@@###')
    trainingid=req.params.id
    training = []
    students = []
    instractors =[]
    certificates =[]
    con.query(`SELECT * FROM trainings WHERE trainingid = ?`,[trainingid], function(err, rows, fields){
        if(err){
            console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            training = rows[0]
            con.query(`SELECT * FROM community LEFT JOIN trainingsstudents ON community.communityid = trainingsstudents.communityid WHERE trainingsstudents.trainingid = ?`
            ,[trainingid],function(err,rows,fields){
                if(err){console.log(err)
                    res.status(400).json({
                        error : err
                    });
                }else{
                    students=rows
                    con.query(`SELECT * FROM community LEFT JOIN traininginstructors ON community.communityid = traininginstructors.communityid WHERE traininginstructors.trainingid = ?`
                    ,[trainingid], function(err, rows, fields){
                        if(err){console.log(err)
                            res.status(400).json({
                                error : err
                            });
                        }else{
                            instractors=rows
                            con.query(`SELECT * FROM community LEFT JOIN certificates ON community.communityid = certificates.communityid WHERE certificates.trainingid = ?`,
                            [trainingid],function(err,rows,fields){
                                if(err){console.log(err)
                                    res.status(400).json({
                                        error : err
                                    });
                                }else{
                                    certificates=rows
                                    res.status(200).json({
                                        training,certificates,students,instractors
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


//view trainings in admin dashbored
exports.getTrainings = (req, res) => {
    trainings = []
    con.query('SELECT * from trainings', function(err,rows,fields){
        if(err){
            res.status(400).json({
                massage : err
            });
        }else{
            trainings = rows
            res.status(200).json({
                trainings
            })
        }
    })
}



//create trainings
exports.create = (req, res) => {
    
    createTraining = {
        train_title: req.body.train_title,
        train_description: req.body.train_description,
        train_startdate: req.body.train_startdate,
        train_enddate: req.body.train_enddate,
        train_durationdays: req.body.train_durationdays,
        train_durationshours: req.body.train_durationshours,
        train_price: req.body.train_price,
        train_modality: req.body.train_modality,
        train_formlink: req.body.train_formlink,
        train_type: req.body.train_type,
        programid: req.body.programid,
    }

    con.query('INSERT INTO trainings SET ?',
    [createTraining],
    function(err, result){
        if(err){
            console.log("ERROR IN ADDING Trainings", err)
            res.status(400).json({
                massage : err
            });
            return;
        }else{
            res.status(200).json({
                message : 'Trainings ADDED TO DATABASE'
            })
            return;
        }
    });
    
};



//create single instroctur
exports.createInstractor = (req, res) => {
    
    createTraining = {
       communityid:req.body.communityid,
       trainingid:req.params.id,
        train_ins_role:req.body.train_ins_role,
        train_ins_decription:req.body.train_ins_decription,
        train_ins_createdby:req.params.userid,
        train_ins_editedby:req.params.userid,
    }

    con.query('INSERT INTO traininginstructors SET ?',
    [createTraining],
    function(err, result){
        if(err){
            console.log("ERROR IN ADDING instroctor", err)
            res.status(400).json({
                error : err
            });
            return;
        }else{
            res.status(200).json({
                message : ' Instructor has been Added'
            })
            return;
        }
    });
    
};



//create single student
exports.createStudent = (req, res) => {
    
    createTraining = {
       communityid:req.body.communityid,
       trainingid:req.params.id,
       student_createdby:req.params.userid,
       student_editedby:req.params.userid
    }

    con.query('INSERT INTO trainingsstudents SET ?',
    [createTraining],
    function(err, result){
        if(err){
            console.log("ERROR IN ADDING student", err)
            res.status(400).json({
                error : err
            });
            return;
        }else{
            res.status(200).json({
                message : ' student has been Added'
            })
            return;
        }
    });
    
};