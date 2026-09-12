import { Router } from "express";
import { Request, Response } from "express";
import { axiosHandler } from "../utils/messages/request_handler";
import config from "../../webconfig.json";
import { invalid, send_fail, send_success } from "../utils/messages/response";
import logger from "../utils/messages/logger";
const router = Router();

router.post("/createTeacher", async (req: Request, res: Response) => {
  try {
    const result = req.body;
    const api_res = await axiosHandler({
      method: "POST",
      url: `${config?.teacher_microservice}/teachers/createTeacher`,
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
    logger.error("student not created", {
      error: err.message,
    });
    return send_fail(res, err?.message);
  }
});

router.get("/getTeachersList", async (req: Request, res: Response) => {
  try {
    const {page,pagesize} = req.query;
    const api_res = await axiosHandler({
      method: "GET",
      url: `${config?.teacher_microservice}/teachers/getTeachersList`,
      params:{
      page,
      pagesize
      
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

export default router;
