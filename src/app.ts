import express from "express"
import config from '../webconfig.json'
import cors from "cors"
import { routes } from "./routes/routes"
import helmet from "helmet"

const app = express()
const port = 4000
const base_url = config?.base_url;
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(helmet())
app.use(base_url, routes);
app.listen(port, async()=>{
    console.log(`gateway is running in ${port}`)
})  