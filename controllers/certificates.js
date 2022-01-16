const mysql = require('mysql');
var dbconnect = require('../dbconnect');
var con = mysql.createConnection(dbconnect.connection);


// get one certificate by id 
exports.getCertificatebyId = (req, res) =>{
    certificate = []
    con.query(`SELECT community.com_name,community.com_email_1,certificates.certificateid,certificates.certificate_score,trainings.train_title,trainings.train_enddate,trainings.train_modality,trainings.train_description FROM community LEFT JOIN certificates ON community.communityid = certificates.communityid LEFT JOIN trainings ON certificates.trainingid = trainings.trainingid WHERE certificates.certificateid = ?`,[req.params.id], function(err, rows, fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            certificate = rows[0]
            res.status(200).json({
                certificate
            })
        }
    })
}
