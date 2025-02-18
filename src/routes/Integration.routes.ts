import Router from "@koa/router";
import IntegrationController from '@/controllers/Integration.controller'


const IntegrationRouter = new Router({ prefix: '/v1/integration' })
const controller = new IntegrationController()

IntegrationRouter.get('/token', controller.showToken)
IntegrationRouter.get('/api/car', controller.getCars)
IntegrationRouter.post('/api/car', controller.createCar)

export default IntegrationRouter
