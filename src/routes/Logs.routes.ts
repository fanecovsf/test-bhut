import Router from "@koa/router";
import LogsController from "@/controllers/Logs.controller";


const LogsRouter = new Router({ prefix: '/logs' })
const controller = new LogsController()

LogsRouter.post('/', controller.createLog)
LogsRouter.get('/', controller.getLogs)

export default LogsRouter
