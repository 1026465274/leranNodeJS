const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('./../../models/tourModel');
dotenv.config({
  path: './config.env',
});

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
      console.log(con.connect);
      console.log('连接成功');
    },
    (err) => {
      console.log(err);
    }
  );

// 读取文件
const tours = JSON.parse(fs.readFileSync(`${__dirname}/shows.json`, 'utf-8'));

// 导入到数据库
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data successfully');
  } catch (e) {
    console.log(e);
  }
  // 退出程序
  process.exit();
};

// 删除所有数据
const deleteData = async () => {
  try {
    await Tour.deleteMany();
  } catch (e) {
    console.log(e);
  }
  process.exit();
};

if (process.argv[2] == '--import') {
  importData();
} else if (process.argv[2] == '--delete') {
  deleteData();
}
console.log(process.argv);
