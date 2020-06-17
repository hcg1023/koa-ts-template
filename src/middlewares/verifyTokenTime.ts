// @ts-ignore
import { Context, Next } from 'koa-swagger-decorator'
import { verifyToken } from '../utils/jwt'
import { ServerResponseError } from '../utils/response'
import { ResponseCodeEnum } from '../enums'

export default function () {
  return async (ctx: Context, next: Next) => {
    if (verifyToken(ctx.state.user)) {
      await next()
    } else {
      throw new ServerResponseError(ResponseCodeEnum.AUTH_INVALID, '用户登录已过期，请重新登录')
    }
  }
}
