const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const error = require('koa-json-error')
const app = new Koa()
const mongoose = require('mongoose')
const routing = require('./routes')
const parameter = require('koa-parameter')
const {connectionStr} = require('./config')
// 自写错误处理中间件 无法捕捉404 Not Found
// app.use(async (ctx, next) => {
//   try {
//     await next()
//   }catch(err) {
//     ctx.status = err.status || err.statusCode || 500
//     ctx.body = {
//       msg: err.message
//     }
//   }
// })
mongoose.connect(connectionStr, { useNewUrlParser: true,useUnifiedTopology: true }, () => {
  console.log('mongoose连接成功')
})
mongoose.connection.on('error', (e) => {
  console.log(e)
})
app.use(error({
  // postFormat: (e, {stack, ...rest}) => process.env.NODE_ENV === 'production'? rest: {stack, ...rest}
}))
app.use(bodyparser())
app.use(parameter(app))
routing(app)
app.listen(8000, () => {
  console.log('服务器启动于8000端口')
})