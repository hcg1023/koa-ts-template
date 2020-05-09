import { Context } from 'koa'
import * as fs from 'fs'
import config from '../config'

export default class HomeController {
  static hellWord(ctx: Context) {
    fs.readFile(config.staticPath + 'index.html', (err, data) => {
      if (!err) {
        ctx.body = data
      }
    })
  }
}
