var mysql = require('mysql');
// MySQL数据库联接配置
var pool = mysql.createPool({
    host: '10.1.1.52', //IP本地
    user: 'root',//用户
    password: 'Stone@123',//密码
    database: 'citex_fusion',//数据库
    port: 3306, //端口
    multipleStatements:true //是否开启多条sql语句查询，因项目需要开启，默认为false
});
var query = function(sql,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,function(qerr,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr,vals,fields);
            });
        }
    });
};
module.exports = query;
