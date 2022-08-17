const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({
  path: './config.env',
});
const app = require('./app');

const DB = process.env.DATACONTENT.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

// 连接数据库集群
mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(
    (con) => {
      // console.log(con.connect);
      console.log('连接成功');
    },
    (err) => {
      console.log(err);
    }
  );

const port = process.env.PORT || 3000;
// 启动服务
app.listen(port, () => {
  console.log('listening on ');
});
