import { Router } from "express";
import config from '../../webconfig.json'
import { axios_handler } from "../utils/messages/request_handler";

 const router = Router()

router.post("/login", async()=>{

const api_res = await axios_handler({
    method:"POST",
    url:`${config?.authentication}/auth/login`
})

console.log(api_res)

})

export default router