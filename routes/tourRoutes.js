const express = require('express');
const {
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
  createTour,
  checkBody,
  getTopFiveCheap,
  getTourStats,
  getMonthlyPlan,
} = require('../controller/tourController');
// 路由 把 tours接口 和user接口分隔开
const router = express.Router();

// 指定接收了某个参数才会经过这个中间件
// router.param('id', (req, res, next, val) => {
//   console.log(`Tor id is :${val}`);
//   next();
// });

router.route('/groupTour').get(getTourStats);
router.route('/monthlyPlan/:year').get(getMonthlyPlan);

router.route('/top-5-cheap').get(getTopFiveCheap, getAllTours);

// 在post方法中多加一个中间件并且在createTour函数前调用  例如post(checkBody, createTour);
// router.route('/').get(getAllTours).post(checkBody, createTour);
router.route('/').get(getAllTours).post(createTour);

// 问号代表路由是地址可以不加
router.get('/:id/:x?/:y?', getTour);

router.patch('/:id?', updateTour);

router.delete('/:id', deleteTour);

module.exports = router;
