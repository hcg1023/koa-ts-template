import * as nodeemailer from 'nodemailer'
import { ServerResponseError } from './response'
import { ResponseCodeEnum } from '../enums'
import config from '../config'

const emailer = nodeemailer.createTransport({
  host: 'smtp.163.com',
  port: 587,
  secure: true,
  auth: {
    user: config.email,
    pass: config.emailPass, // 邮箱授权码
  },
})
async function sendEmail(options: {
  to: string
  subject: string
  text?: string
  html?: string
  attachments?: [{ filename: string; path: string; content?: string }]
}): Promise<void> {
  console.log('开始发送给' + options.to)
  const info = await emailer.sendMail({
    from: config.email,
    ...options,
  })
  console.log('发送成功' + info.messageId)
  return info
}

export async function sendVerifyCodeEmail(email: string): Promise<string> {
  try {
    const verifyCode = Math.random().toString().slice(2, 8)
    const info = await sendEmail({
      to: email,
      subject: '【系统消息】验证码信息',
      text: `【系统消息】您的验证码是${verifyCode}，用于注册系统，3分钟内有效。如非本人操作，请忽略此邮件。`,
    })
    return verifyCode
  } catch (err) {
    throw new ServerResponseError(
      ResponseCodeEnum.EMAIL_SEND_ERROR,
      `邮件发送失败。错误信息：` + err
    )
  }
}
