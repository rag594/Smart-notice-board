/**
 * Created by raghavrastogi on 08/07/15.
 */
var cfg = require('../config');
var mysql = require('mysql');
var moment = require('moment');
var connection = mysql.createConnection(cfg.mysql);

function fetchNotices(param, cb) {

    var query = "Select * from NOTICE where college_name = ? and department =? and Semester = ?";

    connection.query(query, [param.college, param.department, param.semester], function (err, rows) {
        if (err) {
            cb(err, null);
        }
        else {
            cb(null, rows);
        }
    });

}
function storeNotices(param, cb) {
    //console.log(param.body);
    var query = "Insert into NOTICE values (?,?,?,?,?,?,?,?,?,?,?) ";
    var start_time = moment(param.body.startdate + " " + param.body.stime).format("DD/MM/YYYY HH:mm");
    var end_time = moment(param.body.enddate + " " + param.body.etime).format("DD/MM/YYYY HH:mm");
    if (param.body.type == "image" || param.body.type == "video") {
        var val = ['', param.body.description, param.body.type, param.body.priority, param.decoded.username, param.body.semester, param.files.fil.originalname, param.decoded.CollegeName, param.decoded.department, start_time, end_time];
    }
    else {
        //console.log("enter");
        var val = ['', param.body.description, param.body.type, param.body.priority, param.decoded.username, param.body.semester, 'no file', param.decoded.CollegeName, param.decoded.department, start_time, end_time];

    }
    connection.query(query, val, function (err, rows) {
        if (err) {
            cb(err, null);
        }
        else {
            cb(null,rows);
        }
    });
}
module.exports = {
    fetchAllNotices: fetchNotices,
    storeNotices: storeNotices

}