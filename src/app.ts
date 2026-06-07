import express from "express"
import config from '../webconfig.json'
import cors from "cors"
import { routes } from "./routes/routes"

const app = express()
const port = 4000
const base_url = config?.base_url;

app.use(base_url, routes)
app.use(cors())
app.use(express.json())
app.listen(port, async()=>{
    console.log(`gateway is running in ${port}`)
})