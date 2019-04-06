'use strict';

// app 代表应用对象 如果启动插件了 那app 就多了mongoose属性
module.exports = app => {
  // 先得到mongoose的模块 通过它可以定义 骨架模型 和model
  const mongoose = app.mongoose;
  // 先定义 Schema 通过它可以定义集合里文档的属性名和类型
  const Schema = mongoose.Schema;
  // 用户集合的模型骨架 它不连接数据库也不操作数据库
  const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: String,
  });
  // 返回一个用户模型,用户模型是可以对数据库进行操作
  return mongoose.model('User', UserSchema);
};
