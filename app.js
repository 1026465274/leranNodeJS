const express = require('express');
// 日志中间件
const morgan = require('morgan');

const toursRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/usersRoute');
const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  // 日志中间件
  app.use(morgan('dev'));
}

//  查看静态文件中间件
app.use(express.static(`${__dirname}/public`));

// 安装路由器
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', userRouter);
// 自己定义的中间件 next代表执行下去
app.use((req, res, next) => {
  console.log(' hellow, from this middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// app.get('/', (req, res) => {
//   res.status(200).json({ msg: 'hellow', app: 'Natours' });
//   console.log(req);
// });

// app.post('/', (req, res) => {
//   res.status(200).json({ msg: 'post', app: 'Natours' });
// });

module.exports = app;
