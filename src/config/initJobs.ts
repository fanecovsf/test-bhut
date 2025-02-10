import tokenQueue from "@/jobs/queues/tokenQueue";

async function initJobs(): Promise<void> {
    await tokenQueue.add('generateToken', {})
}

export default initJobs
