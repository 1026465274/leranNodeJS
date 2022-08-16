const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true, //唯一
  },
  rating: {
    type: Number,
    defalut: 4.5, //默认值
  },
  price: {
    type: Number,
    required: [true, 'price is required'],
  },
});

const Tours = mongoose.model('Tour', tourSchema);

module.exports = Tours;
