import * as path from 'path'
import * as fs from 'fs'
import config from '../../config'

// 判断如果没有logPath的话，就创建logPath
if (!fs.existsSync(config.logPath)) {
  fs.mkdirSync(config.logPath);
  console.log('createPath: ' + config.logPath);
}
export default {
  // 解决pm2运行的情况下不输出log的问题
  disableClustering: true,
  // 日志格式等设置
  appenders: {
    console: {
      type: 'console',
    },
    error: {
      type: 'dateFile',
      filename: path.join(config.logPath, '/error.log'),
      pattern: '-yyyy-MM-dd-hh.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      maxLogSize: 1000,
      numBackups: 3,
      layout: {
        type: 'basic',
      },
    },
    request: {
      type: 'dateFile',
      filename: path.join(config.logPath, '/request.log'),
      pattern: '-yyyy-MM-dd-hh.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      maxLogSize: 1000,
      numBackups: 3,
      layout: {
        type: 'basic', // 'messagePassThrough'
      },
    },
    response: {
      type: 'dateFile',
      filename: path.join(config.logPath, '/response.log'),
      pattern: '-yyyy-MM-dd-hh.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      maxLogSize: 1000,
      numBackups: 3,
      layout: {
        type: 'basic',
      },
    },
  },
  // 供外部调用的名称和对应设置定义
  categories: {
    default: {
      appenders: ['console'],
      level: 'all',
    },
    response: {
      appenders: ['response'],
      level: 'info',
    },
    error: {
      appenders: ['error'],
      level: 'error',
    },
    request: {
      appenders: ['request'],
      level: 'info',
    },
  },
  baseLogPath: config.logPath,
  replaceConsole: true,
}
