import { SwaggerSchema, SwaggerResponseSchema } from '../utils/swaggerSchema'
// 获取用户信息
export const GetUserInfoQuerySchema = new SwaggerSchema({
  userId: { type: 'string', description: 'userId' },
  userArr: {
    type: 'array',
    items: { type: 'string', description: 'items' },
    description: 'userId',
  },
})
// 注册用户request body
export const RegisterUserBodySchema = new SwaggerSchema({
  userName: {
    type: 'string',
    required: true,
    example: '用户姓名',
  },
  cookies: {
    type: 'boolean',
    description: '是否将token存储在cookies中',
    default: false,
  },
})
// 注册用户response
export const RegisterUserResponseSchema = new SwaggerResponseSchema({
  userName: {
    type: 'string',
    description: '用户姓名',
  },
  token: {
    type: 'string',
    description: 'token',
  },
})
// 注册用户验证码request body
export const RegisterUserVerifyCode = new SwaggerSchema({
  email: {
    type: 'string',
    required: true,
    description: '用于接收验证码的邮箱',
  },
})
