import dotenv from 'dotenv'
import path from 'path'
import Redis from 'ioredis'

dotenv.config({ path: path.join(__dirname, "../../../.env.prod") })

const redisConfig = {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT)
}

const redis = new Redis(redisConfig)

export {
    redisConfig,
    redis
}