class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryParam = { ...this.queryString };
    // 1.过滤
    //  排除某些特殊参数
    const excParam = ['page', 'sort', 'limit', 'fields'];
    excParam.forEach((el) => {
      delete queryParam[el];
    });
    //2。大于小于的过滤

    let queryStr = JSON.stringify(queryParam);
    // gte, gt, lte,lt
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    this.query.find(JSON.parse(queryStr));
    // let tours = Tour.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    // 排序
    if (this.queryString.sort) {
      // 多个排序用逗号分隔 ，这里把逗号换成了 空格 传递给 sort函数
      let sort = this.queryString.sort.split(',').join(' ');
      this.query.sort(sort);
    } else {
      this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    // 3.过滤 只显示传递过来的数据
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query.select(fields);
    } else {
      // - 代表不包括
      this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    // 4. 分页
    // skip 代表跳过 传入数字

    let page = Math.abs(this.queryString.page) || 1;
    let limit = Math.abs(this.queryString.limit) || 10;
    let skip = (page - 1) * limit;
    this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
