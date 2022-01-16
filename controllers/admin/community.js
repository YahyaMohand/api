const mysql = require('mysql');
var dbconnect = require('../../dbconnect');
var con = mysql.createConnection(dbconnect.connection);
var jwt = require('jsonwebtoken');

//programes    list of/add/update
//activites list of/add/update
//interns   list of/add/update
//training  list of/add/update  
//community  list of/add/update
//community list of name email id

exports.communityList=(req,res)=>{
    community=[]
    con.query(`SELECT communityid,com_name,com_name_ar,com_email_1,com_phone_number_1 FROM community`,function(err,rows,fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            community=rows
            res.status(200).json({
               community
            })
        }
    })
}

//adding array of community list by using xlsx file
//completed successfuly done 
exports.onePersonTrace = (req,res,next)=>{
    console.log('reached controoler')
        // console.log('params: ',req.params.id)
        communityid=req.params.id
        community=[]
        trainings=[]
        events=[]
        interns=[]
        successstories=[]
        startups=[]
        instructors=[]
        speakers=[]
        recommendations=[]
        certificates=[]
        con.query('SELECT * FROM trainings LEFT JOIN trainingsstudents ON trainings.trainingid = trainingsstudents.trainingid WHERE trainingsstudents.communityid = ?',[communityid],
        function(err,rows,fields){
            if(err){console.log('one1111111111',err)
                res.status(400).json({
                    error : err
                });
            }else{
                trainings=rows
                con.query('SELECT * FROM trainings LEFT JOIN traininginstructors ON trainings.trainingid = traininginstructors.trainingid WHERE traininginstructors.communityid = ?',[communityid],
        function(err,rows,fields){
            if(err){console.log('2222222222222222',err)
                res.status(400).json({
                    error : err
                });
            }else{
                instructors=rows
                con.query('SELECT * FROM events LEFT JOIN eventattendees ON events.eventid = eventattendees.eventid WHERE eventattendees.communityid = ?',[communityid],
                function(err,rows,fields){
                    
                    if(err){console.log('33333333333',err)
                        res.status(400).json({
                            error : err
                        });
                    }else{
                        events=rows
                        con.query('SELECT * FROM events LEFT JOIN eventspeakers ON events.eventid = eventspeakers.eventid WHERE eventspeakers.communityid = ?',[communityid],
                        function(err,rows,fields){
                        if(err){console.log('444444444444444',err)
                            res.status(400).json({
                                error : err
                            });
                        }else{
                        speakers=rows
                        con.query('SELECT * FROM trainings LEFT JOIN certificates ON trainings.trainingid = certificates.trainingid WHERE certificates.communityid = ?',[communityid],
                        function(err,rows,fields){
                        if(err){console.log('55555555555555555',err)
                            res.status(400).json({
                                error : err
                            });
                        }else{
                            certificates=rows
                            con.query('SELECT * FROM interns WHERE communityid = ?',[communityid],
                            function(err,rows,fields){
                                if(err){console.log('6666666666666',err)
                                    res.status(400).json({
                                        error : err
                                    });
                                }else{
                                    interns=rows
                                    con.query('SELECT * FROM startups LEFT JOIN startupscommunity ON startups.startupid = startupscommunity.startupid WHERE startupscommunity.communityid = ?',[communityid],
                                    function(err,rows,fields){
                                        if(err){console.log('77777777777777777',err)
                                            res.status(400).json({
                                                error : err
                                            });
                                        }else{
                                            startups=rows
                                            con.query('SELECT * FROM successstories WHERE communityid = ?',[communityid],
                                            function(err,rows,fields){
                                                if(err){console.log('888888888888',err)
                                                    res.status(400).json({
                                                        error : err
                                                    });
                                                }else{
                                                    successstories=rows
                                                    con.query('SELECT * FROM recommendations WHERE communityid = ?',[communityid],
                                            function(err,rows,fields){
                                                if(err){console.log('99999999999999',err)
                                                    res.status(400).json({
                                                        error : err
                                                    });
                                                }else{
                                                    recommandations=rows
                                                    con.query('SELECT * FROM community WHERE communityid = ?',[communityid],
                                            function(err,rows,fields){
                                                if(err){console.log('1000000',err)
                                                    res.status(400).json({
                                                        error : err
                                                    });
                                                }else{
                                                    community=rows[0]
                                                        res.status(200).json({
                                                            community,trainings,speakers,events,instructors,certificates,recommendations,successstories,interns,startups
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
                })
            }
        })
                
            }
        })
    
}


//adding array of community list by using xlsx file
//completed successfuly done 
exports.addarrayCommunity = (req,res,next)=>{
    communityArray = req.body;
    for(let i=0;i<communityArray.length;i++){
        con.query('SELECT * FROM community WHERE com_email_1 = ? OR com_email_2 = ?',[communityArray[i].com_email_1,communityArray[i].com_email_1],function(err,rows,fields){
            // console.log('rows up', rows.length)
            if(err){
                res.status(404).json({
                    error: err
                })
            }else{
                // console.log(rows.length)
                if(rows.length === 0){
                    con.query('INSERT INTO community SET ?',[communityArray[i]],function(err, result){
                        if(err){
                            console.log('error in insert',err)
                        }
                    })
                }
                if(i===communityArray.length-1){
                    res.status(200).json({
                        message: 'The process has  done successfuly'
                    })
                }   
            }
        })
    }
    
}

//upload images of community person
exports.imagesCommunity = (req, res) => {
    // console.log('request@@@@@#$$$##$#$', req.files)
    if(req.files === null){
        return res.status(400).json({
            massage: 'No file uploaded'
        })
    }else{
        const file = req.files.file;
        file.name = Date.now()+file.name
        console.log(file)
        console.log('reached else state')
        file.mv(`private/uploads/community/${file.name}`,err =>{
            if(err){
                // console.error('upload error@@@@@@@@@@@', err);
                return res.status(500).send(err);
            }
    
            res.json({fileName: file.name, filePath: `/uploads/community/${file.name}`});
        });
    }

}

//delete community recored from database by id
exports.deleteCommunity = (req,res) =>{
    // console.log('delete request reached')
    con.query('DELETE FROM community WHERE communityid = ?',[req.params.id], function(err,result){
        if(err){
            console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'community recored deleted successfully'
            })
        }
    })
}


//update community information by id 
exports.updateCommunity = (req, res) =>{
    updateCommunity = {
        com_name:req.body.com_name,
        com_email_1:req.body.com_email_1,
        com_email_2:req.body.com_email_2,
        com_phone_number_1:req.body.com_phone_number_1,
        com_phone_number_2:req.body.com_phone_number_2,
        com_degree:req.body.com_degree,
        com_university:req.body.com_university,
        com_college:req.body.com_college,
        com_specialization:req.body.com_specialization,
        com_birthday:req.body.com_birthday,
        com_gender:req.body.com_gender,
        com_currentcity:req.body.com_currentcity,
        com_placeofbirth:req.body.com_placeofbirth,
        com_maritalstatus:req.body.com_maritalstatus,
        com_migrationstatus:req.body.com_migrationstatus,
        com_employmenttype:req.body.com_employmenttype,
        com_sector:req.body.com_sector,
        com_position:req.body.com_position,
        com_organization:req.body.com_organization,
        com_doyouhavestartup:req.body.com_doyouhavestartup,
        com_linkedin:req.body.com_linkedin,
        com_facebook:req.body.com_facebook,
        com_instagram:req.body.com_instagram,
        com_editedby:req.params.userid,
        com_picture:req.body.com_picture,
    }
    con.query('UPDATE community SET ? WHERE communityid = ?',[updateCommunity, req.params.id],
    function(err,result){
        if(err){
            console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'community recored updated successfully'
            })
        }
    })
}



//get community recored by id (full tree information)

//get community by id for updating recored 
exports.getCommunityById = (req, res) =>{
    community = []
    con.query(`SELECT * FROM community WHERE communityid = ?`,[req.params.id], function(err, rows, fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            community = rows[0]
            res.status(200).json({
                community
            })
        }
    })
}

//##########################


//view community in admin dashbored
exports.getCommunityAll = (req, res) => {
    // console.log('reached controller')
    community = []
    con.query('SELECT * from community', function(err,rows,fields){
        // console.log('reached',rows)
        if(err){
            res.status(400).json({
                massage : err
            });
        }else{
            community = rows
            res.status(200).json({
                community
            })
        }
    })
}



//create community
exports.createCommunity = (req, res) => {
    
    createCommunity = {
        com_name:req.body.com_name,
        com_email_1:req.body.com_email_1,
        com_email_2:req.body.com_email_2,
        com_phone_number_1:req.body.com_phone_number_1,
        com_phone_number_2:req.body.com_phone_number_2,
        com_editedby:req.params.userid,
        com_degree:req.body.com_degree,
        com_university:req.body.com_university,
        com_college:req.body.com_college,
        com_specialization:req.body.com_specialization,
        com_birthday:req.body.com_birthday,
        com_gender:req.body.com_gender,
        com_currentcity:req.body.com_currentcity,
        com_placeofbirth:req.body.com_placeofbirth,
        com_maritalstatus:req.body.com_maritalstatus,
        com_migrationstatus:req.body.com_migrationstatus,
        com_employmenttype:req.body.com_employmenttype,
        com_sector:req.body.com_sector,
        com_position:req.body.com_position,
        com_organization:req.body.com_organization,
        com_doyouhavestartup:req.body.com_doyouhavestartup,
        com_linkedin:req.body.com_linkedin,
        com_facebook:req.body.com_facebook,
        com_instagram:req.body. com_instagram,
        // com_createdby:req.body.com_createdby,
        com_editedby:req.params.userid,
        com_picture:req.body.com_picture,
    }
    con.query('INSERT INTO community SET ?',
    [createCommunity],
    function(err, result){
        if(err){
            console.log("ERROR IN ADDING community recored", err)
            res.status(400).json({
                massage : err
            });
            return;
        }else{
            res.status(200).json({
                message : 'community recored ADDED TO DATABASE'
            })
            return;
        }
    });
    
};