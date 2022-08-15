// 使用前注释掉User.save()方法
// node dev-data/data/import-dev-data.js --import
// node dev-data/data/import-dev-data.js --delete
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Show = require('./../../models/showModel');
const Comment = require('./../../models/commentModel');
const User = require('./../../models/userModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

// READ JSON FILE
const shows = JSON.parse(fs.readFileSync(`${__dirname}/shows.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const comments = JSON.parse(
  fs.readFileSync(`${__dirname}/comments.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Show.create(shows);
    await User.create(users, { validateBeforeSave: false });
    await Comment.create(comments);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Show.deleteMany();
    await User.deleteMany();
    await Comment.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
