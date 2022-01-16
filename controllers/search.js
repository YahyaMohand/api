const mysql = require('mysql');
var dbconnect = require('../dbconnect');
var con = mysql.createConnection(dbconnect.connection);

exports.keywordSearch = (req,res,next)=>{
    keyword = req.params.keyword
    products=[];
    // console.log('lenth :',keyword.length)
    if(keyword.length>=120){
        res.status(200).json({
            products
        })
    }else{
        con.query(`SELECT JSON_OBJECT('nameArabic',brands.nameArabic,'nameEnglish',brands.nameEnglish,'brandid',brands.brandid) AS 'brand',products.productid,products.brandid,products.name,products.description,products.useMethod,IF(products.priceType=0,FLOOR(products.price * ${req.usdtoiqd}),products.price) AS price,products.discount,IF(products.priceType=0,FLOOR(products.discountPrice * ${req.usdtoiqd}),products.discountPrice) AS discountPrice,products.imagePath,products.isInStock,products.isNew,products.isVip,products.model,products.serialnumber,products.productionDate,products.expiryDate FROM products LEFT JOIN brands ON products.brandid = brands.brandid WHERE (products.name LIKE ? OR products.productid LIKE ? OR products.model LIKE ? OR brands.nameEnglish LIKE ? OR brands.nameArabic LIKE ? OR products.description LIKE ? )`,[`%${keyword}%`,`%${keyword}%`,`%${keyword}%`,`%${keyword}%`,`%${keyword}%`,`%${keyword}%`],
        function(err,rows,fields){
            if(err){
                res.status(400).json({
                    error:err
                })
            }else{
                products = rows
                res.status(200).json({
                    products
                })
            }
        })
    }
}