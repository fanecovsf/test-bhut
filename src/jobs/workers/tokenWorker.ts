import { redisConfig } from "../config/redis";
import { Worker, Job } from "bullmq";
import GenerateToken from "../GenerateToken";
import RefreshToken from "../RefreshToken";

const tableWorker = new Worker('token-queue', async (job: Job) => {
    try {
        switch (job.name) {
            case "generateToken":
                new GenerateToken().handler()
                break

            case "refreshToken":
                new RefreshToken().handler()
        }
        
    } catch (error) {
        console.log('error')
    }
    
},
    { connection: redisConfig, concurrency: 1 })
