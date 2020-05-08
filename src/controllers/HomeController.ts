import { Context } from 'koa'

export default class HomeController {
  static hellWord(ctx: Context) {
    ctx.body = process.env.NODE_ENV + process.env.npm_package_name
  }
}
