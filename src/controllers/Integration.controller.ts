import { Context } from "koa";
import { bhutIntegrationAxios } from "@/config/axios";
import { redis } from "@/jobs/config/redis";
import { AxiosError } from "axios";


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

    async getCars(ctx: Context): Promise<void> {
        try {
            const token = await redis.get('bhut:token')

            if (!token) {
                ctx.status = 404;
                ctx.body = {
                    message: 'token not found, verify worker'
                }
                return
            }

            const req = await bhutIntegrationAxios.get(
                '/v1/carro',
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )


            if (req.status === 200) {
                ctx.status = 200;
                ctx.body = req.data['itens']
                return
            }
        } catch (e) {
            ctx.status = 500
            ctx.body = {
                message: 'internal server error',
                cause: String(e)
            }
            return
        }
    }

    async createCar(ctx: Context): Promise<void> {
        try {
            const token = await redis.get('bhut:token')

            if (!token) {
                ctx.status = 404;
                ctx.body = {
                    message: 'token not found, verify worker'
                }
                return
            }

            const data = ctx.request.body;

            const req = await bhutIntegrationAxios.post(
                '/v1/carro',
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            ctx.status = 201;
            ctx.body = {
                message: 'vehicle created',
                id: req.data['id']
            }
            return
        } catch (e) {
            if (e instanceof AxiosError) {
                ctx.status = e.response?.status || 500,
                ctx.body = e.request?.data
                return
            }
            
            ctx.status = 500
            ctx.body = {
                message: 'internal server error',
                cause: String(e)
            }
            return
        }
    }
}
