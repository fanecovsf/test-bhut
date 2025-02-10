import { Context } from "koa";
import { redis } from "@/jobs/config/redis";
import { logCreationSchema } from "@/schemas/Logs.schema";
import { v4 } from "uuid";
import errorHandler from "@/utils/errorHandler";

interface LogData {
    id?: string;
}

export default class LogsController {
    async createLog(ctx: Context): Promise<void> {
        try {
            const data = ctx.request.body as LogData;
            await logCreationSchema.validate(data)

            data.id = v4();

            await redis.lpush('logs', JSON.stringify(data));

            ctx.status = 201;
            ctx.body = {
                message: 'log created',
                data: data
            }
            return
        } catch (e) {
            errorHandler(e as Error, ctx)
            return
        }
    }

    async getLogs(ctx: Context): Promise<void> {
        try {
            const data = await redis.lrange('logs', 0, -1);

            const parsedData = data.map(obj => JSON.parse(obj));

            ctx.status = 200;
            ctx.body = parsedData;
            return
        } catch (e) {
            errorHandler(e as Error, ctx)
            return
        }
    }
}
