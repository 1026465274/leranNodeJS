const fs = require('fs');
const Tour = require('../models/tourModel');
const APIFeatures = require('.././utils/apiFeatures');
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/..//dev-data/data/shows.json`)
// );

exports.getAllTours = async (req, res) => {
  // console.log(req.requestTime);
  // 获取查询参数
  console.log(req.query);

  try {
    /*  // const queryParam = { ...req.query };
    // // 1.过滤
    // //  排除某些特殊参数
    // const excParam = ['page', 'sort', 'limit', 'fields'];
    // excParam.forEach((el) => {
    //   delete queryParam[el];
    // });
    // //2。大于小于的过滤

    // let queryStr = JSON.stringify(queryParam);
    // // gte, gt, lte,lt
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log(JSON.parse(queryStr));

    // let tours = Tour.find(JSON.parse(queryStr));
    // gte 大于等于
    //  {difficulty:'easy', duration:{$gte:5}}

    // 2.排序
    // if (req.query.sort) {
    //   // 多个排序用逗号分隔 ，这里把逗号换成了 空格 传递给 sort函数
    //   let sort = req.query.sort.split(',').join(' ');
    //   tours.sort(sort);
    // } else {
    //   tours.sort('-createdAt');
    // }

    // // 3.过滤 只显示传递过来的数据
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(',').join(' ');
    //   tours.select(fields);
    // } else {
    //   // - 代表不包括
    //   tours.select('-__v');
    // }

    // 4. 分页
    // skip 代表跳过 传入数字

    // let page = Math.abs(req.query.page) || 1;
    // let limit = Math.abs(req.query.limit) || 10;
    // let skip = (page - 1) * limit;
    // tours.skip(skip).limit(limit);

    // if (req.query.page) {
    //   // 返回文件的数量
    //   const numTours = await Tour.countDocuments();
    //   if (skip >= numTours) throw new Error('This page does not exist ');
    // }
    */

    // 用创建类的方式  来把上面的代码变成API接口
    const featoures = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    allTours = await featoures.query;
    res.status(200).json({
      requestdAt: req.requestTime,
      status: 'success',
      results: allTours.length,
      data: {
        tours: allTours,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(404).json({
      status: 'error',
      message: e,
      a: 1,
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
    console.log(req.params);
    const tour = await Tour.findById(req.param.id);
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

exports.getTopFiveCheap = (req, res, next) => {
  req.query.sort = 'price,-ratingsAverage';
  req.query.limit = 5;

  next();
};

// 使用mongoose的聚合函数
exports.getTourStats = async (req, res) => {
  try {
    // aggregate 聚合方法 里面传入数组
    const tourStatus = await Tour.aggregate([
      {
        // $match 表示 过滤  对象中传递 过滤的条件
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: 'ratingsAverage',
          num: { $num: 1 },
          avgRating: { $avg: '$price' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        tours: tourStatus,
      },
    });
  } catch (e) {
    res.status(404).json({
      status: 'error',
      message: e,
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;
    const getData = await Tour.aggregate([
      {
        // 解构函数 把数组结构成另一份
        $unwind: '$startDates',
      },
      // {
      //   $match: {
      //     startDates: {
      //       $gte: new Date(),
      //     },
      //   },
      // },

      // {
      //   $group: {
      //     _id: { $month: '$startDates' },
      //     numTourStarts: { $sum: 1 },
      //   },
      // },
      // {
      //   $addFileds: { month: '$_id' },
      // },
      {
        $project: {
          _id: 0,
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        tours: getData,
      },
    });
  } catch (e) {
    res.status(404).json({
      status: 'error',
      message: e,
    });
  }
};
