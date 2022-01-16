const mysql = require('mysql');
var dbconnect = require('../dbconnect');
var con = mysql.createConnection(dbconnect.connection);
var jwt = require('jsonwebtoken');


//upload images of user avatar
exports.userAvatar = (req, res) => {
    // console.log('request@@@@@#$$$##$#$', req.files)
    if(req.files === null){
        return res.status(400).json({
            message: 'No file uploaded'
        })
    }else{
        const file = req.files.file;
        file.name = Date.now()+file.name
        // console.log(file)
        // console.log('reached else state')
        file.mv(`public/uploads/profiles/${file.name}`,err =>{
            if(err){
                // console.error('upload error@@@@@@@@@@@', err);
                return res.status(500).send(err);
            }
    
            res.json({fileName: file.name, filePath: `/uploads/profiles/${file.name}`});
        });
    }

}



//get user orders
exports.getUserOrders = (req,res,next)=>{
    userid = req.params.userid;
    orders = [];
    con.query('SELECT * FROM orders WHERE userid = ?',[userid],(err,rows,fields)=>{
        if(err){
            res.status(400).json({
                error:err
            })
        }else{
            orders=rows
            res.status(200).json({
                orders
            })
        }
    })
}


//autherization of user req.profile is got from here
exports.userById = (req, res, next, id) => {
    con.query('SELECT userid,user_name,user_phonenumber,user_email,role FROM users WHERE userid = ?',
    [id],
    function(err, rows, fields){
        if(err || !rows){
            // console.log(err,rows)
            return res.status(400).json({
                error: 'User not found'
            })
        }
        
        req.profile = rows[0];
        // console.log('user by id',req.profile)
        next();
    });
};

exports.userProfile = (req,res,next)=>{
    userid = req.params.userid
    con.query('SELECT userid,user_name,user_phonenumber,user_email,user_gender,user_logo FROM users WHERE userid = ?',[userid],(err,rows,fields)=>{
        if(err){
            res.status(400).json({
                error:err
            })
        }else{
            user = rows[0]
            con.query('SELECT * FROM orders WHERE userid = ?',[userid],(err,rows,fields)=>{
                if(err){
                    res.status(400).json({
                        error:err
                    }) 
                }else{
                    user.orders=rows
                    res.status(200).json({
                        user
                    })
                }
            })
            
        }
    })
}