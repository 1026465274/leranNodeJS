const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
  _id: {
    type: String,
    require: [true, '_id is required'],
  },
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true, //唯一
  },
  duration: {
    type: Number,
    required: [true, 'duration is required'],
  },
  maxFroupSize: {
    type: Number,
    required: [true, 'max group size is required'],
  },
  difficulty: {
    type: String,
    required: [true, 'difficulty is required'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    defalut: 4.5, //默认值
  },
  price: {
    type: Number,
    required: [true, 'price is required'],
  },
  priceDiscoumnt: Number,
  // 简介 摘要
  summary: {
    type: String,
    required: [true, 'summary is required'],
    trim: true, //在字符串开头和结尾删除所有的空白
  },
  description: {
    type: String,
    trim: true,
  },
  imgeCover: {
    type: String,
    required: [true, 'imgeCover is required'],
  },
  // 指定类型 并且规定为数组的形式
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false, // 再模型中设置不能查找出来
  },
  startDates: [Date],
});

const Tours = mongoose.model('Tour', tourSchema);

module.exports = Tours;
