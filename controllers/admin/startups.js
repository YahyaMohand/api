const mysql = require('mysql');
var dbconnect = require('../../dbconnect');
var con = mysql.createConnection(dbconnect.connection);



//update startup information by id 
exports.updateStartup = (req, res) =>{
    updateGroup = {
        startup_name: req.body.startup_name,
        startup_logo:req.body.startup_logo,
        startup_idea: req.body.startup_idea,
        startup_sector:req.body.startup_sector,
        startup_stage: req.body.startup_stage,
        startup_startdate:req.body.startup_startdate,
        startup_facebook:req.body.startup_facebook,
        startup_instagram:req.body.startup_instagram,
        startup_website:req.body.startup_website,
        startup_editedby:req.params.userid
    }
    con.query('UPDATE startups SET ? WHERE startupid = ?',[updateGroup, req.params.id],
    function(err,result){
        if(err){
            // console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            res.status(200).json({
                message: 'Startup updated successfully'
            })
        }
    })
}



//get one group by id 
exports.getStartupById = (req, res) =>{
    startup = []
    con.query(`SELECT * FROM startups WHERE startupid = ?`,[req.params.id], function(err, rows, fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            startup = rows[0]
            res.status(200).json({
                startup
            })
        }
    })
}

exports.getStartupByIdPage =(req,res)=>{
    startupid=req.params.id
    startup={}
    team=[]
    con.query(`SELECT * FROM startups WHERE startupid = ?`,[startupid], function(err, rows, fields){
        if(err){
            res.status(400).json({
                error : err
            });
        }else{
            startup=rows[0]
            con.query(`SELECT * FROM community LEFT JOIN startupscommunity ON community.communityid = startupscommunity.communityid WHERE startupscommunity.startupid = ?`,
            [startupid],function(err,rows,fields){
                if(err){
                    res.status(400).json({
                        error : err
                    });
                }else{
                   team=rows
                   res.status(200).json({
                    startup,team
                }) 
                }

            })
        }
    })
}
//##########################
//add startups team
exports.addStartupTeam=(req,res)=>{
    // startupid=req.params.id
    createTeam={
        communityid:req.body.communityid,
        startupid: req.params.id,
        st_com_position: req.body.st_com_position,
        st_com_createdby:req.params.userid,
        st_com_editedby:req.params.userid,
        

    }
    con.query(`INSERT INTO startupscommunity SET ?`,[createTeam],function(err,result){
        if(err){
            res.status(400).json({
                error : err
            });}else{
                res.status(200).json({
                    message : 'Startup team has been added'
                })
            }
    })
}

//update startup team
exports.updateStartupTeam=(req,res)=>{
    startupscommunityid=req.params.id
    createTeam={
        communityid:req.body.communityid,
        startupid: req.params.id,
        st_com_position: req.body.st_com_position,
        st_com_editedby:req.params.userid,
    }
    con.query(`UPDATE startupscommunity SET ? WHERE startupscommunityid = ?`,[createTeam,startupscommunityid],function(err,result){
        if(err){
            res.status(400).json({
                error : err
            });}else{
                res.status(200).json({
                    message : 'Startup team has been updated'
                })
            }
    })
}

//view groups in admin dashbored
exports.getStartups = (req, res) => {
    startups = []
    con.query('SELECT * FROM startups', function(err,rows,fields){
        if(err){
            // console.log(err)
            res.status(400).json({
                error : err
            });
        }else{
            startups = rows         
            // console.log(startups)
            res.status(200).json({
                startups
            })
        }
    })
}



// create startup
exports.create = (req, res) => {
    
    createGroup = {
        startup_name: req.body.startup_name,
        startup_logo:req.body.startup_logo,
        startup_idea: req.body.startup_idea,
        startup_sector:req.body.startup_sector,
        startup_stage: req.body.startup_stage,
        startup_startdate:req.body.startup_startdate,
        startup_facebook:req.body.startup_facebook,
        startup_instagram:req.body.startup_instagram,
        startup_website:req.body.startup_website,
        startup_createdby:req.params.userid,
        startup_editedby:req.params.userid
    }

    // console.log(createGroup)
    con.query('INSERT INTO startups SET ?',[createGroup],
    function(err, result){
        if(err){
            // console.log("ERROR IN ADDING group", err)
            res.status(400).json({
                massage : err
            });
            return;
        }else{
            res.status(200).json({
                message : 'Startup ADDED TO DATABASE'
            })
            return;
        }
    });
    
};