const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const workRouter = require('./routes/work');
const bannerRouter = require('./routes/banner');
const commentRouter = require('./routes/comment');
const noticeRouter = require('./routes/notice');
const addressRouter = require('./routes/address');
const auctionRouter = require('./routes/auction');
const app = express();
//启动websocket
// const PORT = 30010;
// const server = require('http').createServer(app);
require('./socket.js');
// server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 可跨域 ,编码格式
app.all('*',function(request, response, next){
  response.header('Access-Control-Allow-Origin','*');
  response.header('Access-Control-Allow-Headers','X-Requested-With');
  response.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
  response.header('X-Powered-By','3.2.1');
  response.header('Content-Type','application/json;charset=utf-8');
  next();
});
// 抛出接口
app.use('/', indexRouter);
app.use('/gongming/api/user', usersRouter);
app.use('/gongming/api/work', workRouter);
app.use('/gongming/api/banner', bannerRouter);
app.use('/gongming/api/comment', commentRouter);
app.use('/gongming/api/notice', noticeRouter);
app.use('/gongming/api/address', addressRouter);
app.use('/gongming/api/auction', auctionRouter);
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
  res.render('error');
});

module.exports = app;
