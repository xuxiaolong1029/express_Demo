var express = require('express');
//var uuid = require('uuid').v1();
var router = express.Router();
var jwt = require('jsonwebtoken');
var md5 = require('md5-node');
var sqlDb = require('../funsionDB');
var cdb = require('../citexDB');

//@ POST users/api
router.post('/api',(req, res, next)=>{
  let token = req.cookies.token;
  let data =  jwt.verify(token,'Bearer');
  let pageNum = Number(req.body.pageNum);
  let pageSize = Number(req.body.pageSize);
  var sql = `SELECT * FROM fusion_reward_record order by id desc limit ${(pageNum-1)*pageSize},${pageSize}`;
  sqlDb(sql,function(err,value,fields){
    res.json({
      code:res.statusCode,
      pageNum:pageNum,
      pageSize:pageSize,
      meg:'successfully',
      list:value
    });
  });
});
router.post('/account',(req, res, next)=>{
  let token = req.cookies.token;
  let data =  jwt.verify(token,'Bearer');
  var sql = `SELECT * FROM fusion_account where user_id = ${data.id}`;
  sqlDb(sql,function(err,value,fields){
    res.json({
      code:res.statusCode,
      meg:'successfully',
      list:value
    });
  });
});
router.post('/login',(req, res, next) => {
  let password = md5(md5(req.body.password)); //对接收的参数进行加密
  let username = req.body.username;
  let loginSql = `SELECT * FROM web_user WHERE username = '${username}'`;
  cdb(loginSql,function(err,result){
    let userInfo = JSON.parse(JSON.stringify(result))[0];
    let rule = { username:userInfo.username,password:userInfo.password,id:userInfo.id };
    if(!err){
      var token =  jwt.sign(rule,'Bearer',{ expiresIn: 3600 });
      res.json({
        code:res.statusCode,
        data:{
          access_token:token,
          token_type:'Bearer',
          username:userInfo.username,
          countryCode:userInfo.country_code,
          email:userInfo.email,
          phone:userInfo.phone,
          twoVerification:userInfo.two_verification,
          loginVerification:userInfo.login_verification
        },
        msg:'登录成功'
      })
    }else{
      res.json({
        code:err.statusCode,
        msg:err.sqlMessage
      })
    }
  });
});
router.post('/verifyToken', (req, res, next)=>{
  let token = req.cookies.token;
  let data =  jwt.verify(token,'Bearer');
  let verifySql = `SELECT * FROM web_user WHERE username = '${data.username}' and password = '${data.password}'`;
  cdb(verifySql,function(err,result,fields){
    if(!err){
      res.json({
        code:res.statusCode,
        data:null,
        msg:'token验证成功'
      })
    }else{
      res.json({
        code:err.code,
        data:err.msg,
        msg:'token验证失败'
      })
    }
  });
});

module.exports = router;
