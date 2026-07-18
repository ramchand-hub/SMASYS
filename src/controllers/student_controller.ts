import { Router } from "express";
import { Request, Response } from "express";
import { axiosHandler } from "../utils/messages/request_handler";
import config from "../../webconfig.json"
import { invalid, send_fail, send_success } from "../utils/messages/response";
import logger from "../utils/messages/logger";
import { error } from "node:console";
const router = Router();

router.post("/createStudent", async (req:Request,res:Response) => {

    try{

        const result = req.body;
        const api_res = await axiosHandler({
               method: "POST",
                 url: `${config?.student_microservice}/students/createStudent`,
                data: result,
        })

        if(api_res?.statusCode === 200){
            return send_success(res,api_res?.response?.message,api_res?.response?.data)
            
        }else{
            return invalid(res,api_res?.response?.message, api_res?.response?.data)
        }

    }catch(err:any){
                logger.error("student not created",{
                    error:err.message
                })
        return send_fail(res, err?.message);
    }
})

export default router