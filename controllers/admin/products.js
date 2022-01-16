const mysql = require('mysql');
var dbconnect = require('../../dbconnect');
var con = mysql.createConnection(dbconnect.connection);
const fileUpload = require('express-fileupload')
var jwt = require('jsonwebtoken');





exports.getProducts = (req, res) => {
    products = []
    con.query('SELECT * from products', function(err,rows,fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            products = rows
            res.status(200).json({
                products
            })
        }
    })
}


//get product by id  for update support
exports.getProductById = (req,res,next) =>{
    products = []
    con.query(`SELECT * FROM products WHERE productid = ?`,[req.params.id], function(err, rows, fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            products = rows[0]
            res.status(200).json({
                products
            })
        }
    })
}


// //get product by id for update support
// exports.getProductById =(req,res,next) =>{
//     product = []
//     con.query(`SELECT * FROM products WHERE productid = ?`,[req.params.id], function(err, rows, fields){
//         if(err){
//             res.status(400).json({
//                 error : err
//             });
//         }else{
//             product = rows[0]
//             res.status(200).json({
//                 product
//             })
//         }
//     })
// }




// //delete product by id 
// exports.deleteProduct =(req,res,next)=>{
//     con.query('DELETE FROM products WHERE productid = ?',[req.params.id], function(err,result){
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


//update product by id
exports.updateProduct = (req, res, next) => {
    updateProduct = {
        product_name:req.body.product_name,
        material_used: req.body.material_used,
        machine_used: req.body.machine_used,
        product_madeby: req.body.product_madeby,
        product_madefor: req.body.product_madefor,
        product_picture: req.body.product_picture,
        product_description: req.body.product_description,
        product_designfile: req.body.product_designfile,
        product_workduration: req.body.product_workduration,
        product_cost: req.body.product_cost,
        product_price: req.body.product_price,
        product_quantity: req.body.product_quantity,
        product_editedby:req.params.userid
    }

    con.query('UPDATE products SET ? WHERE productid = ?',[updateProduct, req.params.id],
    function(err,result){
        if(err){
            console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'Product updated successfully'
            })
        }
    })
}








// //############################

// //view products in admin dashboared it will send styles so each specific product will appearss
// //get all products in list
// exports.getProducts = (req, res, next) =>{
//     let products = [];
//     con.query('SELECT * FROM styles',function(err, rows, fields){
//         if(err){
//             res.status(404).json({
//                 error: err
//             })
//         }else{
//             products = rows
//             for(let i=0;i<products.length;i++){
//                 con.query(`SELECT name,description,useMethod,isInStock,isNew,isVip,model,serialnumber,productionDate,expiryDate FROM products WHERE productid = ?`,[products[i].productid], function(err,rows,fields){
//                     if(err){
//                         res.status(404).json({
//                             error: err
//                         })
//                     }else{
//                         products[i].product=rows
//                         if(i==products.length-1){
//                             res.status(200).json({
//                                 products
//                             })
//                         }
//                     }
                    
//                 })
                
//             }
            
            
//         }
//     })
// }




//upload images of products
exports.images = (req, res) => {
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
        file.mv(`public/uploads/products/${file.name}`,err =>{
            if(err){
                // console.error('upload error@@@@@@@@@@@', err);
                return res.status(500).send(err);
            }
    
            res.json({fileName: file.name, filePath: `/uploads/products/${file.name}`});
        });
    }

}


exports.create = (req, res) => {

    createProduct = {
        product_name:req.body.product_name,
        material_used: req.body.material_used,
        machine_used: req.body.machine_used,
        product_madeby: req.body.product_madeby,
        product_madefor: req.body.product_madefor,
        product_picture: req.body.product_picture,
        product_description: req.body.product_description,
        product_designfile: req.body.product_designfile,
        product_workduration: req.body.product_workduration,
        product_cost: req.body.product_cost,
        product_price: req.body.product_price,
        product_quantity: req.body.product_quantity,
        product_editedby:req.params.userid,
        product_createdby:req.params.userid,
    }
    con.query('INSERT INTO products SET ?',
    [createProduct],
    function(err, result){
        if(err){
            console.log("ERROR IN ADDING PRODUCT", err)
            res.status(400).json({
                error : err
            });
            return;
        }else{
            productid = result.insertId
            res.status(200).json({
                message : `PRODUCT ADDED TO DATABASE PRODUCT ID IS (${productid})`
            })
            return;
        }
    }); 
};


