import { SwaggerRouter } from 'koa-swagger-decorator'

const swaggerRouterOpts = {
  title: '郝晨光的接口文档',
  description: 'swagger doc',
  swaggerHtmlEndpoint: '/swagger',
  swaggerJsonEndpoint: '/swagger-json',
  version: '1.0.0',
}
const router = new SwaggerRouter(null, swaggerRouterOpts)

router.swagger()

router.mapDir(__dirname)

export default router
