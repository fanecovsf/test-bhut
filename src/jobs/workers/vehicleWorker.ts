import { redisConfig } from "../config/redis";
import { Worker, Job } from "bullmq";
import VehicleLogCreation from "../VehicleLogCreation";

new Worker('vehicle-queue', async (job: Job) => {
    switch (job.name) {
        case "vehicleLog":
            new VehicleLogCreation().handler(job.data)
            break
    }
},
    { connection: redisConfig, concurrency: 1 })
