import express from "express"
import config from '../webconfig.json'
import cors from "cors"


const app = express()
const port = 4000



app.listen(port, async()=>{
    console.log(`gateway is running in ${port}`)
})