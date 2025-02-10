import BackgroundJob from "../interfaces/BackgroundJob";
import { bhutIntegrationAxios } from "@/config/axios";
import tokenQueue from "./queues/tokenQueue";
import { redis } from "./config/redis";
import { AxiosError } from "axios";


export default class RefreshToken implements BackgroundJob {
    public async handler() {
        try {
            const token = await redis.get("bhut:token")

            const req = await bhutIntegrationAxios.post(
                '/v1/autenticacao/renova-token',
                {
                    tokenRenovado: token
                }
            )

            if (req.status === 200) {
                const { accessToken, expiresIn } = req.data

                await redis.set("bhut:token", accessToken)

                await tokenQueue.add('refreshToken', {}, { delay: expiresIn - 10000 })
            }
        } catch (e) {
            if (e instanceof AxiosError) {
                console.error(e.response?.data)
            } else {
                console.error(e)
            }

            console.log('Erro no refresh, gerando token novamente')
            await tokenQueue.add('generateToken', {})
        }
    }
}
