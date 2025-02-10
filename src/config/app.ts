import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Application from 'koa';
import initJobs from './initJobs';
import initRoutes from './initRoutes';


export default class App {
    public app: Application = new Koa();
    private port: Number = Number(process.env.PORT) || 3000;

    public middlewares(): void {
        this.app.use(bodyParser());
    }

    public async listen(): Promise<void> {
        // Init jobs
        await initJobs()

        // Init Routes
        initRoutes(this)

        this.middlewares()

        this.app.listen(this.port, () => {
            console.log(`server is running on port ${this.port}`)
        })
    }
}

