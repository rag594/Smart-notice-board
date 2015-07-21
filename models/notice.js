/**
 * Created by raghavrastogi on 08/07/15.
 */
var cfg = require('../config');
var mysql = require('mysql');

var connection = mysql.createConnection(cfg.mysql);

function fetchNotices(param,cb){

    var query = "Select * from NOTICE where college_name = ? and department =? and Semester = ?";

    connection.query(query,[param.college,param.department,param.semester],function(err,rows){
        if(err){
            cb(err,null);
        }
        else{
            cb(null,rows);
        }
    });

}
function storeNotices(param,cb){
console.log(param);
    var query = "Insert into NOTICE values (?,?,?,?,?,?,?,?,?,?,?) "
    var val = ['',param.body.description,param.body.type,param.body.priority,param.decoded.username,param.body.semester,param.files.fil.originalname,param.decoded.CollegeName,param.decoded.department,param.body.stime,param.body.etime];
    console.log("Values",val);
    connection.query(query,val,function(err,rows){
        if(err){
            cb(err,null);
        }
        else{
            cb(rows[0],null);
        }
    });
}
module.exports = {
    fetchAllNotices:fetchNotices,
    storeNotices:storeNotices

}