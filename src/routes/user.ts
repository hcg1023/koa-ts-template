import {
  body,
  Context,
  description,
  prefix,
  query,
  request,
  responses,
  summary,
  tagsAll,
} from 'koa-swagger-decorator'
import config from '../config/config'
import { getToken, tokenExpiresTime } from '../utils/jwt'
import {
  GetUserInfoQuerySchema,
  RegisterUserBodySchema,
  RegisterUserResponseSchema,
  RegisterUserVerifyCode,
} from '../schemas/userSchema'
import { counter } from '../models/counter'
import { CounterKeyEnum, ResponseCodeEnum } from '../enums'
import { validateEmail } from '../validate'
import { ServerResponse, ServerResponseError } from '../utils/response'
import { sendVerifyCodeEmail } from '../utils/sendEmail'
import VerifyCodeModel from '../models/verifyCode'

@tagsAll('User')
@prefix('/user')
export default class UserRouter {
  @request('get', '')
  @query(GetUserInfoQuerySchema)
  @summary('获取用户信息')
  public getUserInfo(ctx: Context): void {
    console.log(ctx.state, '校验')
    ctx.body = ctx.query.userId
  }

  @request('post', '/register')
  @description(
    `注册成功以后，会返回一个token，请在每次请求的过程中将token放置在header中，Authorization 或者 ${config.tokenKey} 或者cookies中的${config.tokenKey}`
  )
  @summary('注册用户')
  @body(RegisterUserBodySchema)
  @responses(RegisterUserResponseSchema)
  public async registerUser(ctx: Context): Promise<void> {
    const { cookies, userName } = ctx.validatedBody
    const userId = await counter(CounterKeyEnum.USER_ID)
    console.log(userId, CounterKeyEnum.USER_ID, '获取的自增id')
    const token = getToken({
      userName,
      userId,
    })
    if (cookies) {
      ctx.cookies.set(config.tokenKey, token, {
        maxAge: tokenExpiresTime,
      })
    }
    ctx.body = {
      userName,
      token,
    }
  }

  @request('post', '/verifyCode')
  @summary('邮箱验证码')
  @body(RegisterUserVerifyCode)
  public async verifyCode(ctx: Context): Promise<void> {
    const { email } = ctx.validatedBody
    const validateResult = validateEmail(email)
    console.log(validateResult)
    if (validateResult.error) {
      throw new ServerResponseError(ResponseCodeEnum.PARAMS_ERROR, `您输入的邮箱不符合规范！`)
    }
    const verifyCode = await sendVerifyCodeEmail(email)
    const verifyCodeModel = new VerifyCodeModel({
      email,
      code: verifyCode,
    })
    await verifyCodeModel.save()
    setTimeout(() => {
      console.log('删除了')
      verifyCodeModel.remove()
    }, 60000)
    ctx.body = new ServerResponse({
      data: true,
    })
  }

  @request('post', '/login')
  @summary('登录用户')
  @body(RegisterUserResponseSchema)
  public loginUser(ctx: Context): void {
    ctx.body = true
  }
}
