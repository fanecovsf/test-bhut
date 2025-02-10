import { Context } from "koa";
import { bhutIntegrationAxios } from "@/config/axios";
import { redis } from "@/jobs/config/redis";


export default class IntegrationController {
    async showToken(ctx: Context): Promise<void> {
        try {
            const token = await redis.get('bhut:token')

            if (!token) {
                ctx.status = 404;
                ctx.body = {
                    message: 'not found'
                }
                return
            }

            ctx.status = 200;
            ctx.body = {
                accessToken: token
            }
            return
        } catch (e) {
            ctx.status = 500
            ctx.body = {
                message: 'internal server error',
                cause: String(e)
            }
            return
        }
    }
}
