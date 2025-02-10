import { redisConfig } from "../config/redis";
import { Worker, Job } from "bullmq";
import VehicleLogCreation from "../VehicleLogCreation";

new Worker('vehicle-queue', async (job: Job) => {
    try {
        switch (job.name) {
            case "vehicleLog":
                new VehicleLogCreation().handler(job.data)
                break
        }
        
    } catch (error) {
        console.log('error')
    }
    
},
    { connection: redisConfig, concurrency: 1 })
