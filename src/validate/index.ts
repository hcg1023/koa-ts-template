import * as Joi from '@hapi/joi'

export function validateEmail(email: string) {
  return Joi.string().email().validate(email)
}
