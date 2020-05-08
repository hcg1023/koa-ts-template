import * as KoaRouter from 'koa-router'
import HomeController from '../controllers/HomeController'
const router = new KoaRouter()

router.get('/', HomeController.hellWord)

export default router
