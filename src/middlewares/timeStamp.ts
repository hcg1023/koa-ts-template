import { Context, Next } from 'koa'

export default function () {
  return async (ctx: Context, next: Next) => {
    const startTime = new Date().getTime()
    console.log(ctx.originalUrl, 'start time:', new Date(startTime).toLocaleString())
    await next()
    const endTime = new Date().getTime()
    console.log(ctx.originalUrl, 'end time:', new Date(endTime).toLocaleString())
    // if (ctx.body instanceof ServerResponse) {
    //   ctx.body.timeStamp = endTime - startTime
    // }
  }
}
