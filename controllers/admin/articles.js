const mysql = require('mysql');
var dbconnect = require('../../dbconnect');
var con = mysql.createConnection(dbconnect.connection);
var jwt = require('jsonwebtoken');


//upload images of articles
exports.imagesArticle = (req, res) => {
    // console.log('request@@@@@#$$$##$#$', req.files)
    if(req.files === null){
        return res.status(400).json({
            massage: 'No file uploaded'
        })
    }else{
        const file = req.files.file;
        file.name = Date.now()+file.name
        // console.log(file)
        // console.log('reached else state')
        file.mv(`public/uploads/articles/${file.name}`,err =>{
            if(err){
                // console.error('upload error@@@@@@@@@@@', err);
                return res.status(500).send(err);
            }
    
            res.json({fileName: file.name, filePath: `/uploads/articles/${file.name}`});
        });
    }

}




//delete an article
exports.deleteArticale = (req, res) =>{
    con.query('DELETE FROM articles WHERE articleid = ?',[req.params.id], function(err,result){
        if(err){
            console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'Artical deleted successfully'
            })
        }
    })
}


//update an article by id
exports.updateArticle =(req, res) =>{
    updateArticle= {
    article_title:req.body.article_title,
    article_body:req.body.article_body,
    article_pictiure:req.body.article_pictiure,
    article_date:req.body.article_date,
    article_editedby:req.params.userid}
    con.query('UPDATE articles SET ? WHERE articleid = ?',
    [updateArticle,req.params.id],
    function(err, result){
        if(err){
            // console.log("error in updating Class category", err)
            res.status(400).json({
                error : err
            });
            return;
        }else{
            res.status(200).json({
                message : 'Article has been updated'
            })
            return;
        }
    });
}


//get article by id to update it later
exports.getArticleId = (req,res) =>{
    articles = []
    con.query(`SELECT * FROM articles WHERE articleid = ?`,[req.params.id], function(err, rows, fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            articles = rows[0]
            res.status(200).json({
                articles
            })
        }
    })
}


exports.createArticle = (req, res) => {

    createArticle = {
        article_title:req.body.article_title,
        article_body:req.body.article_body,
        article_pictiure:req.body.article_pictiure,
        article_date:req.body.article_date,
        article_editedby:req.params.userid,
        article_createdby:req.params.userid
    }
    con.query('INSERT INTO articles SET ?',
    [createArticle],
    function(err, result){
        if(err){
            console.log("ERROR IN ADDING article", err)
            res.status(400).json({
                massage : err
            });
            return;
        }else{
            res.status(200).json({
                message : 'Article has been added'
            })
            return;
        }
    });
    
};