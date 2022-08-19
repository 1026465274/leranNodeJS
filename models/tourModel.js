const mongoose = require('mongoose');
const validator = require('validator');
const tourSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      require: [true, '_id is required'],
    },
    name: {
      type: String,
      required: [true, 'name is required'],
      unique: true, //唯一
      // 用第三方库的验证函数
      validator: [validator.isAlpha, 'name 只能由字母组成'],
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
      // 枚举属性
      enum: ['easy', 'medium', 'difficult'],
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
    startDates: [
      {
        type: Date,
        // 自定义验证属性  当返回false就是不通过
        validator: {
          function(val) {
            // 当创建时 this时指向文档中的  更新的 this不指向
            console.log(this.price);
            return true;
          },
          // 使用({val})可以获取到上面方法中的val值
          message: '测试自定义验证属性 ({val})',
        },
      },
    ],
  },
  {
    // 添加虚拟属性就一定要设置这个
    toJSON: { virtual: true },
    toObject: { virtual: true },
  }
);

// 创建虚拟属性
tourSchema.virtual('duuratioWeeks').get(function () {
  return this.duration / 7;
});

const Tours = mongoose.model('Tour', tourSchema);

module.exports = Tours;
