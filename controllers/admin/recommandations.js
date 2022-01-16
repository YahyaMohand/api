const mysql = require('mysql');
var dbconnect = require('../../dbconnect');
var con = mysql.createConnection(dbconnect.connection);



exports.getRecommandation = (req,res,next)=>{
    recomm = []
    con.query('SELECT * from recommendations',function(err,rows,result){
        
        if(err){
            res.status(400).json({
                error:err
            })
        }else{
            recomm = rows
            res.status(200).json({
                recomm
            })
        }
    })
}

// add recommandations
exports.createRecommandation = (req, res,next) => {

    createRecom = {
        recom_title:req.body.recom_title,
        recom_letter:req.body.recom_letter,
        recom_date:req.body.recom_date,
        recom_madeby:req.body.recom_madeby,
        communityid:req.body.communityid,
        recom_createdby:req.params.userid,
        recom_editedby:req.params.userid,
    }


    con.query('INSERT INTO recommendations SET ?',
    [createRecom],
    function(err, result){
        if(err){
            res.status(400).json({
                error : "Error in adding the event"
            })
        }else{
            res.status(200).json({
                message : "Event has been added"
            })
        }
    });
    
};

// get recommendation by id
exports.getRecommandationById = (req, res) =>{
    recommendation = []
    con.query(`SELECT * FROM recommendations WHERE recommendationid = ?`,[req.params.id], function(err, rows, fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            recommendation = rows[0]
            res.status(200).json({
                recommendation
            })
        }
    })
}


// update recommendations

exports.updateRecommendation = (req, res, next) =>{
    updateRecomm = {
        recom_title:req.body.recom_title,
        recom_letter:req.body.recom_letter,
        recom_date:req.body.recom_date,
        recom_madeby:req.body.recom_madeby,
        recom_editedby:req.params.userid,
    }

    con.query('UPDATE recommendations SET ? WHERE recommendationid = ?',[updateRecomm, req.params.id],
    function(err,result){
        if(err){
            // console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'recommandation has been updated'
            })
        }
    })
}


