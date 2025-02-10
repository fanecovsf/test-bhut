import { Context } from "koa";
import { bhutIntegrationAxios } from "@/config/axios";
import { redis } from "@/jobs/config/redis";
import vehicleQueue from "@/jobs/queues/vehicleQueue";
import { vehicleCreationSchema } from "@/schemas/Vehicle.schema";
import errorHandler from "@/utils/errorHandler";


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
            errorHandler(e as Error, ctx)
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
            errorHandler(e as Error, ctx)
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
            await vehicleCreationSchema.validate(data)

            const req = await bhutIntegrationAxios.post(
                '/v1/carro',
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            vehicleQueue.add('vehicleLog', {
                car_id: req.data['id'],
                data_hora_criacao: new Date().toISOString()
            })

            ctx.status = 201;
            ctx.body = {
                message: 'vehicle created',
                id: req.data['id']
            }
            return
        } catch (e) {
            errorHandler(e as Error, ctx)
            return
        }
    }
}
