import { redisConfig } from "../config/redis";
import { Worker, Job } from "bullmq";
import GenerateToken from "../GenerateToken";
import RefreshToken from "../RefreshToken";

new Worker('token-queue', async (job: Job) => {
    switch (job.name) {
        case "generateToken":
            new GenerateToken().handler()
            break

        case "refreshToken":
            new RefreshToken().handler()
            break
    } 
},
    { connection: redisConfig, concurrency: 1 })
