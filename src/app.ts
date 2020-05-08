import * as Koa from 'koa'
import * as koaCors from 'koa2-cors'
import * as koaBodyParser from 'koa-bodyparser'
import * as koaStatic from 'koa-static'
import * as KoaJwt from 'koa-jwt'
import * as KoaHelmet from 'koa-helmet'
import logger from './middlewares/logger'
import router from './routes/index'
import config from './config'
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
// 请求鉴权
app.use(
		KoaJwt({
			secret: config.JWTSecret,
		}).unless({
			path: [/\//, /\/swagger/, /^\/spa\/.*/], //指定接口忽略JWT验证
		})
)
// 静态资源读取
app.use(koaStatic(config.staticPath))
// 路由
app.use(router.routes()).use(router.allowedMethods())
export default app
