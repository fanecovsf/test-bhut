import App from "./app";
import IntegrationRouter from "@/routes/Integration.routes";
import LogsRouter from "@/routes/Logs.routes";

export default function initRoutes(app: App): void {
    app.app.use(IntegrationRouter.routes())
    app.app.use(LogsRouter.routes())
    return
}
