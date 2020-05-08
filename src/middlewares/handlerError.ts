// @ts-ignore
import { Context, Next } from '@types/koa'
import { error } from './logger'

export default function () {
  return async (ctx: Context, next: Next) => {
    try {
      await next()
    } catch (err) {
      console.log(err)
      error(ctx, err, new Date().toLocaleString())
    }
  }
}
