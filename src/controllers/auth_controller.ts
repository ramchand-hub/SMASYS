import { Router } from "express";
import config from "../../webconfig.json";
import { axiosHandler } from "../utils/messages/request_handler";
import { invalid, send_fail, send_success } from "../utils/messages/response";
import { Request, Response } from "express";
import logger from "../utils/messages/logger";
import jwt from "jsonwebtoken";
import multer_config from "../multer/multer_config";
const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const result = req.body;

    const api_res = await axiosHandler({
      method: "POST",
      url: `${config?.authentication}/auth/register`,
      data: result,
    });

    if (api_res?.statusCode === 200) {
      return send_success(
        res,
        api_res?.response?.message,
        api_res?.response?.data,
      );
    } else {
      return invalid(res, api_res.response.message, api_res?.response?.data);
    }
  } catch (error: any) {
    return send_fail(res, error.message);
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const result = req.body;

    const api_res = await axiosHandler({
      method: "POST",
      url: `${config?.authentication}/auth/login`,
      data: result,
    });

    logger.info(api_res?.response?.data);


    if (api_res?.statusCode === 200) {
      const user_id = api_res?.response?.data?.user?._id;

      const token = jwt.sign({ user_id }, config?.JWT_SECRET as string, {
        expiresIn: "1h",
      });
      return send_success(res, api_res?.response?.message, {
        ...api_res?.response?.data,
        token,
      });
    } else {
      return send_success(
        res,
        api_res?.response?.message,
        api_res?.response?.data,
      );
    }
  } catch (error: any) {
    return send_fail(res, error.message);
  }
});

router.post("/forgot-password", async (req: Request, res: Response) => {
  try {
    const result = req.body;

    const api_res = await axiosHandler({
      method: "POST",
      url: `${config?.authentication}/auth/forgot-password`,
      data: result,
    });

    if (api_res?.statusCode === 200) {
      return send_success(
        res,
        api_res?.response?.message,
        api_res?.response?.data,
      );
    } else {
      return send_success(
        res,
        api_res?.response?.message,
        api_res?.response?.data,
      );
    }
  } catch (error: any) {
    return send_fail(res, error.message);
  }
});
router.post("/update-password", async (req: Request, res: Response) => {
  try {
    const result = req.body;

    const api_res = await axiosHandler({
      method: "POST",
      url: `${config?.authentication}/auth/update-password`,
      data: result,
    });

    if (api_res?.statusCode === 200) {
      return send_success(
        res,
        api_res?.response?.message,
        api_res?.response?.data,
      );
    } else {
      return send_success(
        res,
        api_res?.response?.message,
        api_res?.response?.data,
      );
    }
  } catch (error: any) {
    return send_fail(res, error.message);
  }
});

router.post("/uploadfile",
  multer_config.array("file",20),
  async (req:Request,res:Response)=>{
  try{

    const file = (req as any).files

     const api_res = await axiosHandler({
      method: "POST",
      url: `${config?.authentication}/auth/uploadfile`,
      data: file,
    });

    if (api_res?.statusCode === 200) {
      return send_success(
        res,
        api_res?.response?.message,
        api_res?.response?.data,
      );
    } else {
      return send_success(
        res,
        api_res?.response?.message,
        api_res?.response?.data,
      );
    }

  }catch(error:any){
    return send_fail(res, error.message);

  }
})

router.get("/downloadfile/:id",
  async (req:Request,res:Response)=>{
  try{

    const file_id = req.params.id;
     const api_res = await axiosHandler({
      method: "GET",
      url: `${config?.authentication}/auth/downloadfile/${file_id}`,
      // data: file,
    });

    if (api_res?.statusCode === 200) {
      return send_success(
        res,
        api_res?.response?.message,
        api_res?.response?.data,
      );
    } else {
      return send_success(
        res,
        api_res?.response?.message,
        api_res?.response?.data,
      );
    }

  }catch(error:any){
    return send_fail(res, error.message);

  }
})

export default router;
