const db = [{ name: "李雷" }];
const User = require('../models/users')

class UsersCtl {
  async create(ctx) {
    ctx.verifyParams({
      name: {type: 'string'},
    })
    const user = await new User(ctx.request.body).save()
    // db.push(ctx.request.body);
    ctx.body = user;
  }
  async delete(ctx) {
    const user = await User.findByIdAndRemove(ctx.params.id)
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.status = 204;
  }
  async find(ctx) {
    const user = await User.find()
    ctx.body = user;
  }
  async findById(ctx) {
    if (ctx.params.id * 1>= db.length) {
      ctx.throw(412, '用户id越界')
    }
    const user = await User.findById(ctx.params.id)
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.body = user;
  }
  async update(ctx) {
    ctx.verifyParams({
      name: {type: 'string'},
    })
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.body = user;
  }
}

module.exports = new UsersCtl();
