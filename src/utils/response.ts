import { ResponseCodeEnum } from '../enums'

interface ResponseData {
  [key: string]: string | number | boolean | Array<ResponseData> | ResponseData
}
interface ServerResponseOption {
  code?: ResponseCodeEnum
  data?: null | boolean | ResponseData
  msg?: string
  success?: boolean
  timeStamp?: number
}

export class ServerResponse {
  public code: ResponseCodeEnum
  public data: null | boolean | ResponseData
  public msg: string
  public success: boolean
  public timeStamp: number
  public constructor({
    code = ResponseCodeEnum.SUCCESS,
    data = null,
    msg = 'success',
    success = true,
    timeStamp = Date.now(),
  }: ServerResponseOption) {
    this.code = code
    this.data = data
    this.msg = msg
    this.success = success
    this.timeStamp = timeStamp
  }
}
export class ServerResponseError extends Error {
  public code: ResponseCodeEnum
  public message: string
  public constructor(code: ResponseCodeEnum, message: string) {
    super(`Server Response Error: ${message}`)
    this.code = code
    this.message = message
  }
}
