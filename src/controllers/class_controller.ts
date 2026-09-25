import { Router } from "express";
import { Request, Response } from "express";
import { axiosHandler } from "../utils/messages/request_handler";
import config from "../../webconfig.json";
import { invalid, send_fail, send_success } from "../utils/messages/response";
import logger from "../utils/messages/logger";
import { error } from "node:console";
const router = Router();

router.post("/createClass", async (req: Request, res: Response) => {
  try {
    const result = req.body;
    const api_res = await axiosHandler({
      method: "POST",
      url: `${config?.teacher_microservice}/classes/createClass`,
      data: result,
    });

    if (
      api_res?.statusCode === 200 ||
      api_res?.statusCode === 201 ||
      api_res?.statusCode === 409
    ) {
      return send_success(
        res,
        api_res?.response?.message,
        api_res?.response?.data,
      );
    } else {
      return invalid(res, api_res?.response?.message, api_res?.response?.data);
    }
  } catch (err: any) {
    logger.error("class not created", {
      error: err.message,
    });
    return send_fail(res, err?.message);
  }
});

router.get("/getclassesList", async (req: Request, res: Response) => {
  try {
    const {page,pagesize, searchquery} = req.query;
    const api_res = await axiosHandler({
      method: "GET",
      url: `${config?.teacher_microservice}/classes/getclassesList`,
      params:{
      page,
      pagesize,
      searchquery
      },
    });

    if (
      api_res?.statusCode === 200 
    ) {
      return send_success(
        res,
        api_res?.response?.message,
        api_res?.response?.data,
      );
    } else {
      return invalid(res, api_res?.response?.message, api_res?.response?.data);
    }
  } catch (err: any) {
    logger.error("teachers list not getting", {
      error: err.message,
    });
    return send_fail(res, err?.message);
  }
});
router.put("/updateclass/:id", async(req:Request, res:Response)=>{
  try{
      const {id} = req.params
      const result = req.body
      const api_res = await axiosHandler({
      method: "PUT",
      url: `${config?.teacher_microservice}/classes/updateclass/${id}`,
      data: result
    });
     if (
      api_res?.statusCode === 200 
    ) {
      return send_success(
        res,
        api_res?.response?.message,
        api_res?.response?.data,
      );
    } else {
      return invalid(res, api_res?.response?.message, api_res?.response?.data);
    }

  }catch(err:any){
    logger.error("teacher is not getting",{
      error:err.message
    })
        return send_fail(res, err?.message);

  }
})
router.delete("/deleteclass/:id", async(req:Request, res:Response)=>{
  try{
      const {id} = req.params
      // const result = req.body
      const api_res = await axiosHandler({
      method: "DELETE",
      url: `${config?.teacher_microservice}/classes/deleteclass/${id}`,
      // data: result
    });
     if (
      api_res?.statusCode === 200 
    ) {
      return send_success(
        res,
        api_res?.response?.message,
        api_res?.response?.data,
      );
    } else {
      return invalid(res, api_res?.response?.message, api_res?.response?.data);
    }

  }catch(err:any){
    logger.error("teacher is not getting",{
      error:err.message
    })
        return send_fail(res, err?.message);

  }
})
export default router;
