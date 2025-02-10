import BackgroundJob from "../interfaces/BackgroundJob";
import { bhutIntegrationAxios } from "@/config/axios";
import tokenQueue from "./queues/tokenQueue";
import { redis } from "./config/redis";
import { AxiosError } from "axios";


export default class GenerateToken implements BackgroundJob {
    public async handler() {
        try {
            const req = await bhutIntegrationAxios.post(
                '/v1/autenticacao/token',
                {
                    login: process.env.BHUT_LOGIN,
                    senha: process.env.BHUT_PASSWORD
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

            console.log('Aguardando 30s para gerar o token novamente')
            await tokenQueue.add('generateToken', {}, { delay: 30000 })
        }
    }
}
