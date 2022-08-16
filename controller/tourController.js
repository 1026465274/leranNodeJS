const fs = require('fs');
const Tour = require('../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/..//dev-data/data/shows.json`)
// );

exports.getAllTours = async (req, res) => {
  // console.log(req.requestTime);
  try {
    allTours = await Tour.find();
    res.status(200).json({
      requestdAt: req.requestTime,
      status: 'success',
      results: allTours.length,
      data: {
        tours: allTours,
      },
    });
  } catch (e) {
    res.status(404).josn({
      status: 'error',
      message: e,
    });
  }
};

//  创建一个checkBody 的中间件
// 检查  body 是否 包含  name 和 price 属性
// 如果没有 返回400
// 并且加入到堆栈中

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name && !req.body.price) {
//     return res.status(400).json({ message: '要包含name 和price' });
//   }
//   next();
// };
exports.getTour = async (req, res) => {
  // console.log(req.params);

  // const id = req.params.id * 1;
  // const tour = tours.find((el) => {
  //   return el.id === id;
  // });
  try {
    const tour = await Tour.findById(req.params.id);
    // findOne({_id: req.params.id} )
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (e) {}
};

exports.createTour = async (req, res) => {
  // 使用mongoDB数据库来操作数据
  // 创建方式1
  // const newTours = new Tour({});
  //  newTours.save();   //返回的是一个promise对象

  // 创建方式2
  try {
    const newTour = await Tour.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: 'error',
      message: e,
    });
  }

  // 以下是用文件进行的测试
  // const newId = tours.length;
  // const newTours = Object.assign({ id: newId }, req.body);

  // tours.push(newTours);
  // fs.writeFile(
  //   `${__dirname}/../dev-data/data/shows.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(201).json({
  //       status: 'success',
  //       data: {
  //         tours: newTours,
  //       },
  //     });
  //   }
  // );
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (e) {}
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (e) {
    res.status(404).json({
      status: 'error',
      message: e,
    });
  }
};
