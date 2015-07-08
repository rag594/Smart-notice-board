/**
 * Created by raghavrastogi on 08/07/15.
 */

var express = require('express');
var router = express.Router();
var notice = require('../models/notice');


/*
router.post('/',function(req,res,next){
    res.render('notices');
});
*/

router.post('/deptnotices',function(req,res,next){
    //console.log("hi");
    console.log(req.body);
    notice.fetchAllNotices(req.body.college,req.body.department,req.body.semester,function(notice,err){
        if(err){
            res.json({error:err});
        }

        else{
            res.json({"resefesult":notice});
        }
    });


});

module.exports = router;