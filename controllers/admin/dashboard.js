const mysql = require('mysql');
var dbconnect = require('../../dbconnect');
var con = mysql.createConnection(dbconnect.connection);
var jwt = require('jsonwebtoken');



//static dashboard
exports.staticdashboard = (req,res,next) =>{
    startdate=req.params.start
    enddate=req.params.end
    submittedorders={}
    ondeliverydorders={}
    recivedorders={}
    cancelledorders={}
    products={}
    styles={}
    users={}
    soldproducts={}
    productsdiscount={}
    productsprice={}
    // productscost={}
    // console.log(req)
    con.query('SELECT COUNT(*) AS recivedorders FROM orders WHERE orderstatus = ? AND (createDate BETWEEN ? AND ?)',["reviced",startdate,enddate],
        function(err,rows,fields){
            if(err){console.log('1',err)
                res.status(400).json({
                    error: 'error geting the value'
                })
            }else{
                recivedorders=rows[0].recivedorders
                con.query('SELECT COUNT(*) AS cancelledorders FROM orders WHERE orderstatus = ? AND (createDate BETWEEN ? AND ?)',["cancelled",startdate,enddate],
                function(err,rows,fields){
                    if(err){
                        res.status(400).json({
                            error: 'error geting the value'
                        })
                    }else{
                        cancelledorders=rows[0].cancelledorders
                        con.query('SELECT COUNT(*) AS ondeliverydorders FROM orders WHERE orderstatus = ? AND (createDate BETWEEN ? AND ?)',["on delivery",startdate,enddate],
                        function(err,rows,fields){
                            if(err){
                                res.status(400).json({
                                    error: 'error geting the value'
                                })
                            }else{
                                ondeliverydorders=rows[0].ondeliverydorders
                                con.query('SELECT COUNT(*) AS submittedorders FROM orders WHERE orderstatus = ? AND (createDate BETWEEN ? AND ?)',["submitted",startdate,enddate],
                                function(err,rows,fields){
                                    if(err){
                                        res.status(400).json({
                                            error: 'error geting the value'
                                        })
                                    }else{
                                        submittedorders=rows[0].submittedorders
                                        con.query('SELECT COUNT(*) AS products FROM products WHERE (createDate BETWEEN ? AND ?)',[startdate,enddate],
                                        function(err,rows,fields){
                                            if(err){
                                                res.status(400).json({
                                                    error: 'error geting the value'
                                                })
                                            }else{
                                                products=rows[0].products
                                                con.query('SELECT COUNT(*) AS styles FROM styles LEFT JOIN products ON styles.productid = products.productid WHERE (products.createDate BETWEEN ? AND ?)',[startdate,enddate],
                                                function(err,rows,fields){
                                                    if(err){console.log('styles',err)
                                                        res.status(400).json({
                                                            error: 'error geting the value'
                                                        })
                                                    }else{
                                                        styles=rows[0].styles
                                                        con.query('SELECT COUNT(*) AS users FROM users  WHERE (createDate BETWEEN ? AND ?)',[startdate,enddate],
                                                        function(err,rows,fields){
                                                            if(err){
                                                                res.status(400).json({
                                                                    error: 'error geting the value'
                                                                })
                                                            }else{
                                                                users=rows[0].users
                                                                con.query('SELECT SUM(quantity) AS soldproducts FROM orderdetails LEFT JOIN orders ON orderdetails.orderid = orders.orderid WHERE orderstatus = ? AND (orders.createDate BETWEEN ? AND ?)',['reviced',startdate,enddate],
                                                                function(err,rows,fields){
                                                                    if(err){
                                                                        res.status(400).json({
                                                                            error: 'error geting the value'
                                                                        })
                                                                    }else{
                                                                        soldproducts=rows[0].soldproducts
                                                                        con.query('SELECT SUM(quantity) AS productsdiscount FROM orderdetails LEFT JOIN orders ON orderdetails.orderid = orders.orderid WHERE orders.orderstatus = ? AND orderdetails.price <> orderdetails.discountPrice AND (orders.createDate BETWEEN ? AND ?)',['reviced',startdate,enddate],
                                                                        function(err,rows,fields){
                                                                            if(err){
                                                                                res.status(400).json({
                                                                                    error: 'error geting the value'
                                                                                })
                                                                            }else{
                                                                                productsdiscount=rows[0].productsdiscount
                                                                                con.query('SELECT SUM(discountPrice * quantity) AS productsprice FROM orderdetails LEFT JOIN orders ON orderdetails.orderid = orders.orderid WHERE orders.orderstatus = ? AND (orders.createDate BETWEEN ? AND ?)',['reviced',startdate,enddate],
                                                                                function(err,rows,fields){
                                                                                    if(err){
                                                                                        res.status(400).json({
                                                                                            error: 'error geting the value'
                                                                                        })
                                                                                    }else{
                                                                                        productsprice=rows[0].productsprice
                                                                                        res.status(200).json({
                                                                                            submittedorders,ondeliverydorders,recivedorders,cancelledorders,products,styles,users,soldproducts,productsdiscount,productsprice
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
        }
    )
}



//dynamic parameters
exports.dynamicparameters = (req,res,next)=>{
    cities={}
    classcategories={}
    brands={}
    subcategories={}
    maincategories={}
    topproducts={}
    suppliers={}
    con.query('SELECT cities.nameEnglish,COUNT(*) AS count FROM orders LEFT JOIN address ON orders.addressid = address.addressid LEFT JOIN cities ON address.cityid = cities.cityid GROUP BY cities.nameEnglish ORDER BY count DESC',
    function(err,rows,fields){
        if(err){
            res.status(400).json({
                error: 'error geting the value'
            })
        }else{
            cities=rows
            con.query('SELECT brands.nameEnglish,COUNT(*) AS count FROM orderdetails LEFT JOIN styles ON orderdetails.styleid = styles.styleid LEFT JOIN products ON styles.productid = products.productid LEFT JOIN brands ON products.brandid = brands.brandid GROUP BY brands.nameEnglish ORDER BY count DESC',
            function(err,rows,fields){
                if(err){
                    res.status(400).json({
                        error: 'error geting the value'
                    })
                }else{
                    brands=rows
                    con.query('SELECT classcategories.nameEnglish,COUNT(*) AS count FROM orderdetails LEFT JOIN styles ON orderdetails.styleid = styles.styleid LEFT JOIN products ON styles.productid = products.productid LEFT JOIN classcategories ON products.classcateid = classcategories.classcateid GROUP BY classcategories.nameEnglish ORDER BY count DESC',
                    function(err,rows,fields){
                        if(err){
                            res.status(400).json({
                                error: 'error geting the value'
                            })
                        }else{
                            classcategories=rows
                            con.query('SELECT subcategories.nameEnglish,COUNT(*) AS count FROM orderdetails LEFT JOIN styles ON orderdetails.styleid = styles.styleid LEFT JOIN products ON styles.productid = products.productid LEFT JOIN subcategories ON products.subcateid = subcategories.subcateid GROUP BY subcategories.nameEnglish ORDER BY count DESC',
                            function(err,rows,fields){
                                if(err){
                                    res.status(400).json({
                                        error: 'error geting the value'
                                    })
                                }else{
                                    subcategories=rows
                                    con.query('SELECT categories.nameEnglish,COUNT(*) AS count FROM orderdetails LEFT JOIN styles ON orderdetails.styleid = styles.styleid LEFT JOIN products ON styles.productid = products.productid LEFT JOIN categories ON products.categoryid = categories.categoryid GROUP BY categories.nameEnglish ORDER BY count DESC',
                                    function(err,rows,fields){
                                        if(err){
                                            res.status(400).json({
                                                error: 'error geting the value'
                                            })
                                        }else{
                                            maincategories=rows
                                            con.query('SELECT products.productid,products.name,products.cost,products.price,products.discountMargin,products.margin,products.discount,products.imagePath,products.model,products.priceType,products.dlink,COUNT(*) AS count FROM orderdetails LEFT JOIN styles ON orderdetails.styleid = styles.styleid LEFT JOIN products ON styles.productid = products.productid  GROUP BY products.model ORDER BY count DESC LIMIT 50',
                                            function(err,rows,fields){
                                                if(err){
                                                    res.status(400).json({
                                                        error: 'error geting the value'
                                                    })
                                                }else{
                                                    topproducts=rows
                                                    con.query('SELECT store.nameEnglish,COUNT(*) AS count FROM orderdetails LEFT JOIN styles ON orderdetails.styleid = styles.styleid LEFT JOIN products ON styles.productid = products.productid LEFT JOIN store ON products.storeid = store.storeid GROUP BY store.nameEnglish ORDER BY count DESC',
                                                    function(err,rows,fields){
                                                        if(err){
                                                            res.status(400).json({
                                                                error: 'error geting the value'
                                                            })
                                                        }else{
                                                            suppliers=rows
                                                            res.status(200).json({
                                                                cities,classcategories,brands,subcategories,maincategories,topproducts,suppliers,
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

//##########################