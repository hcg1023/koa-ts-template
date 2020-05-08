import * as koaLog from 'koa-log4'
import logConfig from './config'
import { Context, Next } from 'koa'

// 加载配置文件
koaLog.configure(logConfig)

// 调用预先定义的日志名称
const responseLogger = koaLog.getLogger('response')
const requestLogger = koaLog.getLogger('request')
const errorLogger = koaLog.getLogger('error')
const consoleLogger = koaLog.getLogger()

// 封装错误日志
export const error = function (ctx: Context, error: Error, resTime: string) {
  if (ctx && error) {
    errorLogger.error(formatError(ctx, error, resTime))
  }
}

// 封装请求日志
export const request = function (ctx: Context, resTime: string) {
  if (ctx) {
    requestLogger.info(formatReqLog(ctx, resTime))
  }
}
// 封装响应日志
export const response = function (ctx: Context, resTime: string) {
  if (ctx) {
    responseLogger.info(formatRes(ctx, resTime))
  }
}

export const info = function (info: string) {
  if (info) {
    consoleLogger.info(formatInfo(info))
  }
}

function formatInfo(info: string): string {
  let logText = ''
  // 响应日志开始
  logText += '\n' + '***************info log start ***************' + '\n'

  // 响应内容
  logText += 'info detail: ' + '\n' + JSON.stringify(info) + '\n'

  // 响应日志结束
  logText += '*************** info log end ***************' + '\n'

  return logText
}

// 格式化响应日志
function formatRes(ctx: Context, resTime: string): string {
  let logText = ''
  // 响应日志开始
  logText += '\n' + '*************** response log start ***************' + '\n'

  // 添加请求日志
  logText += formatReqLog(ctx.request, resTime)

  // 响应状态码
  logText += 'response status: ' + ctx.status + '\n'

  // 响应内容
  logText += 'response body: ' + JSON.stringify(ctx.body) + '\n'

  // 响应日志结束
  logText += '*************** response log end ***************' + '\n'

  return logText
}

// 格式化错误日志
function formatError(ctx: Context, err: Error, resTime: string): string {
  let logText = ''

  // 错误信息开始
  logText += '\n' + '*************** error log start ***************' + '\n'

  // 添加请求日志
  logText += formatReqLog(ctx.request, resTime)

  // 错误名称
  logText += 'err name: ' + err.name + '\n'
  // 错误信息
  logText += 'err message: ' + err.message + '\n'
  // 错误详情
  logText += 'err stack: ' + err.stack + '\n'

  // 错误信息结束
  logText += '*************** error log end ***************' + '\n'

  return logText
}

// 格式化请求日志
function formatReqLog(req: any, resTime: string): string {
  const method = req.method
  let logText = ''
  // 访问方法
  logText += '\n' + 'request method: ' + method + '\n'

  logText += '\n' + 'request host: ' + req.header.host + '\n'
  // 请求原始地址
  logText += 'request originalUrl:  ' + req.originalUrl + '\n'

  // 客户端ip
  logText += 'request client ip:  ' + req.ip + '\n'

  // 开始时间
  //   var startTime;
  // 请求参数
  if (method === 'GET') {
    logText += 'request query:  ' + JSON.stringify(req.query) + '\n'
    // startTime = req.query.requestStartTime;
  } else {
    logText += 'request body: ' + JSON.stringify(req.body) + '\n'
    // startTime = req.body.requestStartTime;
  }
  // 服务器响应时间
  logText += 'response time: ' + resTime + '\n'

  return logText
}

export default function () {
  return async (ctx: Context, next: Next): Promise<void> => {
    ctx.logger = {
      error,
      request,
      response,
      info,
    }
    request(ctx, new Date().toLocaleString())
    console.log(ctx.originalUrl)
    await next()
    response(ctx, new Date().toLocaleString())
  }
}
