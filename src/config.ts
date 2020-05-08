// @ts-ignore
import { Context } from '@types/koa'

import * as path from 'path'
const resolvePath = (pathString: string): string => path.join(__dirname, pathString)

export default {
  port: process.env.PROT || 3000,
  projectRootPath: resolvePath('../'),
  staticPath: resolvePath('../public'),
  logPath: resolvePath('/logs/'),
  mongoHost: 'mongodb://127.0.0.1:27017/koa-ts',
  mongoUser: '',
  mongoPassword: '',
  JWTSecret: 'hcg1023-koa-ts',
  corsOption: {
    origin: (ctx: Context): string => {
      return ctx.request.header.origin
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin'],
  },
}
