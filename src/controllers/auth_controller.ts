import { Router } from "express";
import config from '../../webconfig.json'
import { axios_handler } from "../utils/messages/request_handler";
import { send_fail, send_success } from "../utils/messages/response";
import { HTTP_STATUS } from "../utils/messages/status_code";
import { Request,Response } from "express";
 const router = Router()

router.post("/login", async(req:Request,res:Response)=>{
try{
const api_res = await axios_handler({
    method:"POST",
    url:`${config?.authentication}/auth/login`
})


if(api_res?.statuscode === 200){
    return send_success(
        res,
        "login successfully",
        "xxxxxxxxxx",

    )
}
}

catch(error:any){
    return send_fail(res,error.message)
}

})

export default router