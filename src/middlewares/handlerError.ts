// @ts-ignore
import { Context, Next } from '@types/koa'
import { error } from './logger'
import { ServerResponse, ServerResponseError } from '../utils/response'
import { ResponseCodeEnum } from '../enums'
const AUTH_ERROR_STATUS_CODE = 401
export default function () {
  return async (ctx: Context, next: Next) => {
    try {
      await next()
    } catch (err) {
      console.log(err)
      console.log(err.name)
      error(ctx, err, new Date().toLocaleString())
      if (err instanceof ServerResponseError) {
        if (err.code === ResponseCodeEnum.AUTH_INVALID) {
          ctx.status = AUTH_ERROR_STATUS_CODE
        }
        ctx.body = new ServerResponse({
          code: err.code,
          msg: err.message,
          success: false,
        })
      } else if (err.status === 400 && err.field) {
        ctx.body = new ServerResponse({
          code: ResponseCodeEnum.PARAMS_ERROR,
          msg: `${err.field}参数异常！请更改后重试！`,
          success: false,
        })
      } else if (err.name === 'UnauthorizedError') {
        ctx.status = AUTH_ERROR_STATUS_CODE
        ctx.body = new ServerResponse({
          code: ResponseCodeEnum.AUTH_ERROR,
          msg: '用户未登录，请先登录或注册！',
          success: false,
        })
      } else if (err.name === 'MongoError') {
        if (err.code === 11000) {
          ctx.body = new ServerResponse({
            code: ResponseCodeEnum.DB_ERROR,
            msg: `${JSON.stringify(err.keyValue)}已经存在，请勿重复请求`,
            success: false,
          })
        } else {
          ctx.body = new ServerResponse({
            code: ResponseCodeEnum.DB_ERROR,
            msg: `存储数据发生错误！错误信息：${err}`,
            success: false,
          })
        }
      } else {
        ctx.body = new ServerResponse({
          code: ResponseCodeEnum.UNKNOWN_ERROR,
          msg: `服务器错误！请稍后重试！有疑问请联系站长！错误信息：${err}`,
          success: false,
        })
      }
    }
  }
}
