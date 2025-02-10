import { redisConfig } from "../config/redis";
import { Queue } from 'bullmq'

export default new Queue('token-queue', { connection: redisConfig })