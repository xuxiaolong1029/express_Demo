var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieSession = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var compression = require('compression');
var jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

//解决跨域
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
});
var ejs = require('ejs');
// view engine setup
app.set('views', path.join(__dirname, 'citex-fusion'));
app.engine('html',ejs.renderFile);//__express
app.set('view engine','html');
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(cookieSession ({
  secret: "hello world",
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 10 * 60 * 60 * 1000}
}));
//只有登录接口不需要校验token
app.use(expressJWT({ secret: 'Bearer'}).unless({
  path: ['/users/login','/']
}));

app.use(function (err, req, res, next) {
  var token = req.body.token || req.cookies.token;
  if (token) {
    // 解码 token (验证 secret 和检查有效期（exp）)
    jwt.verify(token, 'Bearer', function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: '无效的token.' });
      } else {
        // 如果验证通过，在req中写入解密结果
        req.decoded = decoded;
        next(); //继续下一步路由
      }
    });
  } else {
    return res.send({
      code:403,
      success: false,
      message: '没有找到token.'
    });
  }
});

app.use('/public',express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.html');
});

module.exports = app;
