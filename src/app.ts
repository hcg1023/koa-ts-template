import * as Koa from 'koa'
import * as koaCors from 'koa2-cors'
import * as koaBodyParser from 'koa-bodyparser'
import * as koaStatic from 'koa-static'
import * as KoaJwt from 'koa-jwt'
import * as KoaHelmet from 'koa-helmet'
import logger from './middlewares/logger'
import router from './routes'
import config from './config'
import verifyTokenTime from './middlewares/verifyTokenTime'
import handlerError from './middlewares/handlerError'
import timeStamp from './middlewares/timeStamp'

const app = new Koa()
// 添加响应时间戳
app.use(timeStamp())
// koa安全
app.use(KoaHelmet())
// cors跨域
app.use(koaCors(config.corsOption))
// 请求体格式化
app.use(koaBodyParser())
// 请求与响应日志
app.use(logger())
// 错误日志
app.use(handlerError())
// 请求鉴权，目前所有的静态资源也需要token权限才可以访问
app.use(
  KoaJwt({
    secret: config.JWTSecret,
    getToken(ctx: Koa.Context): string {
      return (
        ctx.headers.Authorization ||
        ctx.headers[config.tokenKey] ||
        ctx.cookies.get(config.tokenKey)
      )
    },
  }).unless({
    path: [
      /^\/$/,
      /\/favicon.ico/,
      /\/koa-logo.png/,
      /^\/swagger/,
      /^\/user$/,
      /^\/user\/verifyCode$/,
    ], // 指定接口忽略JWT验证
  })
)
// 校验token时间是否过期
app.use(verifyTokenTime())
// 静态资源读取
app.use(koaStatic(config.staticPath))
// 路由
// @ts-ignore
app.use(router.routes()).use(router.allowedMethods())
export default app
