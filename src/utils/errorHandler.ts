import { ValidationError } from "yup";
import { AxiosError } from "axios";
import { Context } from "koa";


export default function errorHandler(e: Error, ctx: Context) {
    if (e instanceof ValidationError) {
        ctx.status = 400;
        ctx.body = {
            message: 'validation error',
            error: e.message
        }
        return;
    }

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
