const mysql = require('mysql');
var dbconnect = require('../../dbconnect');
var con = mysql.createConnection(dbconnect.connection);
var jwt = require('jsonwebtoken');



// upload file of services
exports.serviceFile = (req, res) => {
    // console.log('request@@@@@#$$$##$#$', req.files)
    if(req.files === null){
        return res.status(400).json({
            message: 'No file uploaded'
        })
    }else{
        const file = req.files.file;
        file.name = Date.now()+file.name
        console.log(file)
        console.log('reached else state')
        file.mv(`public/uploads/services/${file.name}`,err =>{
            if(err){
                // console.error('upload error@@@@@@@@@@@', err);
                return res.status(500).send(err);
            }
    
            res.json({fileName: file.name, filePath: `/uploads/services/${file.name}`});
        });
    }

}



//delete city from database by id
// exports.deleteCity = (req,res) =>{
//     // console.log('delete request reached')
//     con.query('DELETE FROM cities WHERE cityid = ?',[req.params.id], function(err,result){
//         if(err){
//             console.log(err)
//             res.status(400).json({
//                 error : err
//             });
//         }else{
//             res.status(200).json({
//                 message: 'city deleted successfully'
//             })
//         }
//     })
// }


// update service from admin page
exports.updateService = (req, res) => {
    serviceid=req.params.id
    createService = {
        service_name: req.body.service_name,
        service_description: req.body.service_description,
        service_file: req.body.service_file,
        service_beneficiary:req.body.service_beneficiary,
        service_price: req.body.service_price,
        service_workduration: req.body.service_workduration,
        service_madeby:req.body.service_madeby,
        service_editedby:req.params.userid
    }
    // console.log(createCity);
    con.query('UPDATE services SET ? WHERE serviceid = ?',
    [createService,serviceid],
    function(err, result){
        if(err){
            console.log("ERROR IN updating CITY", err)
            res.status(400).json({
                error : err
            });
            
        }else{
            res.status(200).json({
                message : 'Service has been updated'
            })
          
        }
    });
    
};



//get one service by id 
exports.getServiceById = (req, res) =>{
    service = []
    con.query(`SELECT * FROM services WHERE serviceid = ?`,[req.params.id], function(err, rows, fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            service = rows[0]
            res.status(200).json({
                service
            })
        }
    })
}


exports.getServices = (req, res) =>{
    services = []
    con.query('SELECT * from services', function(err,rows,fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            services = rows
            res.status(200).json({
                services
            })
        }
    })
}




// create service from admin page
exports.createService = (req, res) => {
    createService = {
        service_name: req.body.service_name,
        service_description: req.body.service_description,
        service_file: req.body.service_file,
        service_beneficiary:req.body.service_beneficiary,
        service_price: req.body.service_price,
        service_workduration: req.body.service_workduration,
        service_madeby:req.body.service_madeby,
        service_createdby:req.params.userid,
        service_editedby:req.params.userid
    }
    // console.log(createCity);
    con.query('INSERT INTO services SET ?',
    [createService],
    function(err, result){
        if(err){
            console.log("ERROR IN ADDING CITY", err)
            res.status(400).json({
                error : err
            });
            
        }else{
            res.status(200).json({
                message : 'Service has been added'
            })
          
        }
    });
    
};