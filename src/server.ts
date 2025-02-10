import App from "@/config/app";
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
    path: path.resolve(__dirname, '../.env.prod')
})

const app = new App();

app.listen()
