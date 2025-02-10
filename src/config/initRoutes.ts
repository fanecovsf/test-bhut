import App from "./app";
import IntegrationRouter from "@/routes/Integration.routes";

export default function initRoutes(app: App): void {
    app.app.use(IntegrationRouter.routes())
    return
}
