const mysql = require('mysql');
var dbconnect = require('../dbconnect');
var con = mysql.createConnection(dbconnect.connection);
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');//to generate signed token
const expressJwt = require('express-jwt');
const {OAuth2Client} = require ('google-auth-library');
const fetch = require('node-fetch');


//function to fix arabic numbers and convert them to english
var
arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
englishNumbers  = [/0/g, /1/g, /2/g, /3/g, /4/g, /5/g, /6/g, /7/g, /8/g, /9/g],
fixNumbers = function (str)
{
  if(typeof str === 'string')
  {
    for(var i=0; i<10; i++)
    {
      str = str.replace(arabicNumbers[i], i).replace(englishNumbers[i], i);
    }
  }
  return str;
};


//to check if the requsest came from user
exports.isAuth = (req,res,next)=>{
  let user = req.profile && req.auth && req.profile.userid == req.auth._userid
  if(!user){
    return res.status(403).json({
      error: "Access denied"
    })
  }
  next();
}

//to check if the requsest came from admin
exports.isAdmin = (req,res,next)=>{
  if(req.profile.role === 0 ){
    return res.status(403).json({
      error: "Admin resourse! Access denied"
    })
  }
  next();
}


//sigup (registeration resquest)
exports.signup = (req, res) => {
  var cryptedpassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(5));
  var user = {
    user_name : req.body.user_name,
    user_email : req.body.user_email,
    user_password : cryptedpassword
    }


  //to check for phone number if found in the database

  con.query('SELECT user_email FROM users WHERE user_email = ?',[user.user_email], function(err, rows, fields){
    console.log(rows)
    if (Object.keys(rows).length !== 0) {
        res.status(404).json({
          error: 'تم تسجيل حساب بهذا الرقم مسبقا'
        });
    }else{
      //query for inserting registeration data to mysql db.
      con.query('INSERT INTO users SET ?', [user], function(err, result){
        console.log(err)
        if(err){
          res.status(404).json({
            massage : err
          });
          return;
        }else{
          console.log('signup done suuccesfuly')
          res.status(200).json({
            message : 'تمت عملية التسجيل بنجاح'
          })
          return;
        }
      });
    }
  });
};







//signin (login requests)
exports.signin = (req, res)=>{
  user_email = req.body.user_email
  console.log(user_email)
  con.query('SELECT * FROM users WHERE user_email = ?', [user_email], function(err, rows, fields){
      if(err){
          res.status(404).json({
              error: err
          });
      }else{
        if(Object.keys(rows).length === 0){  
          res.status(404).json({
              error: 'المستخدم غير مسجل'
          });
        }else{
          var login_password = bcrypt.compareSync(req.body.user_password, rows[0].user_password);
          if(!login_password){
            res.status(404).json({
                error: 'خطا في كلمة السر'
            });
          }else{
            var user = {
              userid: rows[0].userid,
              username : rows[0].user_name,
              role : rows[0].role,
              phonenumber : rows[0].user_phonenumber,
              picture : rows[0].user_logo,
              gender : rows[0].user_gender,
            }
            const token = jwt.sign({
                _userid: user.userid,
            }, process.env.JWT_SECRET, {expiresIn:'1825d'})//expires in 5 years
            return res.status(200).json({
              token,
              user: user
            });
          }
        }
      }
  });
};

//signout method
exports.signout = (req, res)=>{
  res.clearCookie(token);
  res.json({message: "Signout success"})
}