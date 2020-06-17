export enum ResponseCodeEnum {
  SUCCESS = '000', // 成功
  AUTH_ERROR = '100', // 无token
  AUTH_INVALID = '101', // 无token
  PARAMS_ERROR = '200', // 参数错误
  EMAIL_SEND_ERROR = '201', // 邮件发送错误
  UNKNOWN_ERROR = '500', // 未知服务器错误
  DB_ERROR = '501', // 数据库错误
}
