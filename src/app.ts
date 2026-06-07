import express from "express"
import cors from "cors"


const app = express();
const port = 3002;
app.use(cors());
app.use(express.json());

app.listen(port,()=>{
    console.log(`web common api in ${port}`)
})

