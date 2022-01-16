const mysql = require('mysql');
var dbconnect = require('../../dbconnect');
var con = mysql.createConnection(dbconnect.connection);
var jwt = require('jsonwebtoken');



//delete city from database by id
// exports.deleteStore = (req,res) =>{
//     // console.log('delete request reached')
//     con.query('DELETE FROM store WHERE storeid = ?',[req.params.id], function(err,result){
//         if(err){
//             // console.log(err)
//             res.status(400).json({
//                 error : err
//             });
//         }else{
//             res.status(200).json({
//                 message: 'Store deleted successfully'
//             })
//         }
//     })
// }


// update successstories by id 
exports.updateStory = (req, res) =>{
    // console.log(req.body)
    updateStore = {
        story_description: req.body.story_description,
        story_title:req.body.story_title,
        story_team: req.body.story_team,
        communityid:req.body.communityid,
        story_editedby:req.params.userid
    }
    con.query('UPDATE successstories SET ? WHERE storyid = ?',[updateStore, req.params.id],
    function(err,result){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'Story updated successfully'
            })
        }
    })
}



// get one stories by id 
exports.getStoryById = (req, res) =>{
    successstory = []
    con.query('SELECT * FROM successstories WHERE storyid = ?',[req.params.id], function(err, rows, fields){
        if(err){
            console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            successstory = rows[0]
            res.status(200).json({
                successstory
            })
        }
    })
}




//######################################





//view brands in admin dashbored
exports.getSuccessStories = (req, res) => {
    successstories = []
    con.query('SELECT * from successstories', function(err,rows,fields){
        if(err){
            res.status(400).json({
                massage : err
            });
        }else{
            successstories = rows
            res.status(200).json({
                successstories
            })
        }
    })
}



//adding store page 
// exports.addStore = (req,res) =>{
//     cities = []
//     con.query('SELECT * FROM cities', function(err,rows,fields){
//         if(err){
//             res.status(404).json({
//                 error:err
//             })
//         }else{
//             cities = rows
//             res.status(200).json({
//                 cities
//             })
//         }
//     })
// }


exports.createStories = (req, res) => {

    createStore = {
        story_description: req.body.story_description,
        story_title:req.body.story_title,
        story_team: req.body.story_team,
        communityid:req.body.communityid,
        story_editedby:req.params.userid,
        story_createdby:req.params.userid,
    }


    con.query('INSERT INTO successstories SET ?',
    [createStore],
    function(err, result){
        if(err){
            console.log("ERROR IN ADDING Success Stories", err)
            res.status(400).json({
                massage : err
            });
            return;
        }else{
            res.status(200).json({
                message : 'Success Stories has been added'
            })
            return;
        }
    });
    
};