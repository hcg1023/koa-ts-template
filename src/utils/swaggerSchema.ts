export declare interface QuerySchema {
  [name: string]: QuerySchemaValue | QueryObjectSchemaValue | QueryArraySchemaValue
}

declare interface BaseSchema {
  description?: string // 描述
  example?: string | boolean | number // 例子
  enum?: Array<any> // 枚举
  required?: boolean // 是否必填
  default?: string | number | boolean // 默认值
}
declare interface QuerySchemaValue extends BaseSchema {
  type: 'string' | 'number' | 'boolean'
}
declare interface QueryArraySchemaValue extends BaseSchema {
  type: 'array'
  items: QuerySchemaValue | QueryArraySchemaValue
}
declare interface QueryObjectSchemaValue extends BaseSchema {
  type: 'object'
  properties: QuerySchema
}

export class SwaggerSchema {
  [name: string]: QuerySchemaValue | QueryObjectSchemaValue | QueryArraySchemaValue
  public constructor(props: QuerySchema) {
    Object.keys(props).forEach(key => {
      this[key] = props[key]
    })
  }
}
interface ResponseSchema {
  description: string
  properties: QuerySchema
}
export class SwaggerResponseSchema {
  [code: number]: ResponseSchema
  public 200: ResponseSchema = {
    description: 'success',
    properties: {
      code: {
        type: 'string',
        example: '000',
        description: 'server response code',
      },
      msg: {
        type: 'string',
        example: 'success',
        description: 'server response message',
      },
      data: {
        type: 'object',
        properties: null,
      },
      success: {
        type: 'boolean',
        example: true,
        description: 'server response is success',
      },
      timeStamp: {
        type: 'number',
        description: 'server response time',
      },
    },
  }
  public 401: ResponseSchema = {
    description: 'UnauthorizedError',
    properties: null,
  }
  public 404: ResponseSchema = {
    description: 'Not Fund',
    properties: null,
  }
  public constructor(props: QuerySchema) {
    // @ts-ignore
    this['200'].properties.data.properties = props
  }
}
