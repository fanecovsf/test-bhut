import { redisConfig } from "../config/redis";
import { Queue } from 'bullmq'

export default new Queue('vehicle-queue', { connection: redisConfig })