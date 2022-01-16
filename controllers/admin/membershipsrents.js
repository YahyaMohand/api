const mysql = require('mysql');
var dbconnect = require('../../dbconnect');
var con = mysql.createConnection(dbconnect.connection);
var jwt = require('jsonwebtoken');

// //upload images of logistic agrements
// exports.imagesLogistics = (req, res) => {
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
//         file.mv(`public/uploads/logistics/${file.name}`,err =>{
//             if(err){
//                 // console.error('upload error@@@@@@@@@@@', err);
//                 return res.status(500).send(err);
//             }
    
//             res.json({fileName: file.name, filePath: `/uploads/logistics/${file.name}`});
//         });
//     }

// }

// //delete city from database by id
// exports.deleteLogistics = (req,res) =>{
//     // console.log('delete request reached')
//     con.query('DELETE FROM dbkwaysi.logistics WHERE logisticsid = ?',[req.params.id], function(err,result){
//         if(err){
//             console.log(err)
//             res.status(400).json({
//                 error : err
//             });
//         }else{
//             res.status(200).json({
//                 message: 'logistics record deleted successfully'
//             })
//         }
//     })
// }


//update logistics record information by id 
exports.updateMembershiprent = (req, res) =>{
    updateMemrent = {
        mem_startdate:req.body.mem_startdate,
        mem_enddate:req.body.mem_enddate,
        mem_type:req.body.mem_type,
        mem_durationtype:req.body.mem_durationtype,
        mem_price:req.body.mem_price,
        mem_teamname:req.body.mem_teamname,
        mem_description:req.body.mem_description,
        mem_duration:req.body.mem_duration,
        mem_editedby:req.body.mem_editedby,
    }
    con.query('UPDATE membershipsrent SET ? WHERE membershipsrentid = ?',[updateMemrent, req.params.id],
    function(err,result){
        if(err){
            console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'membership has been updated'
            })
        }
    })
}



//get one membership item by id 
exports.getMemrentById = (req, res) =>{
    membershipsrentid=req.params.id
    membershipsrents = []
    membershipsrentcommunity=[]
    con.query(`SELECT * FROM membershipsrent WHERE membershipsrentid = ?`,[membershipsrentid], function(err, rows, fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            membershipsrents = rows[0]
            con.query(`SELECT * FROM membershipsrentcommunity WHERE membershipsrentid = ?`,[membershipsrentid],
            function(err,rows,fields){
                if(err){
                    res.status(400).json({
                        error : err
                    });
                }else{
                    membershipsrentcommunity=rows
                    res.status(200).json({
                        membershipsrents,membershipsrentcommunity
                    })
                }
            })
           
        }
    })
}


//##########################


//view logistics items in admin dashbored
exports.getMemrents = (req, res) => {
    membershipsrents = []
    con.query('SELECT * from membershipsrent', function(err,rows,fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            membershipsrents = rows
            res.status(200).json({
                membershipsrents
            })
        }
    })
}

//membership people
exports.getPeoplebyid=(req,res)=>{
    membershipsrentcommunityid=req.params.id
    membershipsrentscommunity=[]
    con.query(`SELECT * FROM membershipsrentcommunity WHERE membershipsrentcommunityid = ?`,[membershipsrentcommunityid],function(err,rows,fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            membershipsrentscommunity = rows[0]
            res.status(200).json({
                membershipsrentscommunity
            })
        }
    })
}



//create logistics
exports.createMembership = (req, res) => {
    
    updateMemrent = {
        mem_startdate:req.body.mem_startdate,
        mem_enddate:req.body.mem_enddate,
        mem_type:req.body.mem_type,
        mem_durationtype:req.body.mem_durationtype,
        mem_price:req.body.mem_price,
        mem_teamname:req.body.mem_teamname,
        mem_description:req.body.mem_description,
        mem_duration:req.body.mem_duration,
        mem_editedby:req.body.mem_editedby,
        mem_createdby:req.body.mem_createdby,
    }
    con.query('INSERT INTO membershipsrent SET ?',
    [updateMemrent],
    function(err, result){
        if(err){
            console.log("ERROR IN ADDING membership item", err)
            res.status(400).json({
                error : err
            });
           
        }else{
            res.status(200).json({
                message : 'membership has been added'
            })
        }
    });
    
};



//add membership rent persons
// membershipsrentcommunity
exports.addPeopletomemship = (req,res)=>{
    createArray={
        membershipsrentid:req.params.id,
        communityid:req.body.communityid,
    }
    con.query('INSERT INTO membershipsrentcommunity SET ?',
    [createArray],
    function(err, result){
        if(err){
            console.log("ERROR IN ADDING membership people", err)
            res.status(400).json({
                error : err
            });
           
        }else{
            res.status(200).json({
                message : 'person has been added'
            })
        }
    });
}



//update logistics record information by id 
exports.updateMemPeople = (req, res) =>{
    membershipsrentcommunityid=req.params.id
   updateArray={
    membershipsrentid:req.body.membershipsrentid,
    communityid:req.body.communityid,
   }
    con.query('UPDATE membershipsrentcommunity SET ? WHERE membershipsrentcommunityid = ?',[updateArray, membershipsrentcommunityid],
    function(err,result){
        if(err){
            console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'membership person has been updated'
            })
        }
    })
}