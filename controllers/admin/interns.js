const mysql = require('mysql');
var dbconnect = require('../../dbconnect');
var con = mysql.createConnection(dbconnect.connection);
var jwt = require('jsonwebtoken');

//upload images of hr userid
// exports.imagesHR = (req, res) => {
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
//         file.mv(`public/uploads/hr/${file.name}`,err =>{
//             if(err){
//                 // console.error('upload error@@@@@@@@@@@', err);
//                 return res.status(500).send(err);
//             }
    
//             res.json({fileName: file.name, filePath: `/uploads/hr/${file.name}`});
//         });
//     }

// }

//delete hr from database by id
// exports.deleteHR = (req,res) =>{
//     console.log('delete request reached')
//     con.query('DELETE FROM dbkwaysi.hr WHERE hrid = ?',[req.params.id], function(err,result){
//         if(err){
//             console.log(err)
//             res.status(400).json({
//                 error : err
//             });
//         }else{
//             res.status(200).json({
//                 message: 'hr record deleted successfully'
//             })
//         }
//     })
// }


// update interns information by id 
exports.updateInterns = (req, res) =>{
    updateInterns = {
        intern_description:req.body.intern_description,
        intern_startdate:req.body.intern_startdate,
        intern_enddate:req.body.intern_enddate,
        intern_evaluation:req.body.intern_evaluation,
        intern_evaluationdetalis:req.body.intern_evaluationdetalis,
        intern_supervisior:req.body.intern_supervisior,
        intern_title:req.body.intern_title,
        intern_payment:req.body.intern_payment,
        intern_durationweeks:req.body.intern_durationweeks,
        intern_hoursperweek:req.body.intern_hoursperweek,
        communityid:req.body.communityid,
        intern_editedby:req.params.userid
        
    }
    con.query('UPDATE interns SET ? WHERE internid = ?',[updateInterns, req.params.id],
    function(err,result){
        if(err){
            console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'intern updated successfully'
            })
        }
    })
}



// get one intern by id 
exports.getInternById = (req, res) =>{
    intern = []
    con.query(`SELECT * FROM interns WHERE internid = ?`,[req.params.id], function(err, rows, fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            intern = rows[0]
            res.status(200).json({
                intern
            })
        }
    })
}


//##########################


//view interns in admin pages
exports.getInterns = (req, res) => {
    interns = []
    con.query('SELECT * from interns', function(err,rows,fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            interns = rows
            res.status(200).json({
                interns
            })
        }
    })
}



//create intern record
exports.createIntern = (req, res) => {
    
    create = {
        intern_description:req.body.intern_description,
        intern_startdate:req.body.intern_startdate,
        intern_enddate:req.body.intern_enddate,
        intern_evaluation:req.body.intern_evaluation,
        intern_evaluationdetalis:req.body.intern_evaluationdetalis,
        intern_supervisior:req.body.intern_supervisior,
        intern_title:req.body.intern_title,
        intern_payment:req.body.intern_payment,
        intern_durationweeks:req.body.intern_durationweeks,
        intern_hoursperweek:req.body.intern_hoursperweek,
        communityid:req.body.communityid,
        intern_createdby:req.params.userid,
        intern_editedby:req.params.userid
    }


    con.query('INSERT INTO interns SET ?',
    [create],
    function(err, result){
        if(err){
            console.log("ERROR IN ADDING Employee", err)
            res.status(400).json({
                error : err
            });
         
        }else{
            res.status(200).json({
                message : 'Intern has been added'
            })
          
        }
    });
    
};

