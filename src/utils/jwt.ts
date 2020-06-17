import * as JwtSimple from 'jwt-simple'
import config from '../config'
// token过期时间，一天
export const tokenExpiresTime = 1000 * 60 * 60 * 24

interface UserParams {
  userName: string
  userId: number
}

interface UserPayload extends UserParams {
  overTime: number
}

export function getToken(userInfo: UserParams): string {
  const payload: UserPayload = {
    ...userInfo,
    overTime: Date.now() + tokenExpiresTime,
  }
  return JwtSimple.encode(payload, config.JWTSecret)
}

export function verifyToken(payload: UserPayload): boolean {
  if (payload && payload.userName) {
    return Date.now() < payload.overTime
  }
  return true
}
