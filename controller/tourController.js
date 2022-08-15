const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/..//dev-data/data/shows.json`)
);
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    requestdAt: req.requestTime,
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

//  创建一个checkBody 的中间件
// 检查  body 是否 包含  name 和 price 属性
// 如果没有 返回400
// 并且加入到堆栈中

exports.checkBody = (req, res, next) => {
  if (!req.body.name && !req.body.price) {
    return res.status(400).json({ message: '要包含name 和price' });
  }
  next();
};
exports.getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;
  const tour = tours.find((el) => {
    return el.id === id;
  });

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours.length;
  const newTours = Object.assign({ id: newId }, req.body);

  tours.push(newTours);
  fs.writeFile(
    `${__dirname}/../dev-data/data/shows.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tours: newTours,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '更新中',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
