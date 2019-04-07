'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  // 默认自动生成的id类型
  const ObjectId = Schema.Types.ObjectId;
  const ArticleSchema = new Schema({
    //  required: true 必填 不填报错
    title: { type: String, required: true },
    content: { type: String, required: true },
    // 应用引用 user表
    user: {
      type: ObjectId,
      ref: 'User',
    },
    // pv 阅读量
    pv: { type: Number, default: 0 },
    comments: [
      {
        user: {
          type: ObjectId,
          ref: 'User',
        },
        content: String,
        createAt: { type: Date, default: Date.now },
      },
    ],
    createAt: { type: Date, default: Date.now },
  });

  return mongoose.model('Article', ArticleSchema);
};
