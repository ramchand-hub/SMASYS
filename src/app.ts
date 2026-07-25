import express from "express"
import config from '../webconfig.json'
import cors from "cors"
import { routes } from "./routes/routes"
import helmet from "helmet"
import logger from "./utils/messages/logger"
const app = express()
const port = 4000
const base_url = config?.base_url;
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(helmet())
app.use(base_url, routes);
process.on("uncaughtException",(err)=>{
    logger.error("Uncaught Exception", {
        message: err.message,
        stack: err.stack
    });

    process.exit(1);
})
app.listen(port, async()=>{
    console.log(`gateway is running in ${port}`)
})  