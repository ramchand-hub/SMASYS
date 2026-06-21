import { Router } from "express";
import config from "../../webconfig.json";
import { axiosHandler } from "../utils/messages/request_handler";
import { invalid, send_fail, send_success } from "../utils/messages/response";
import { Request, Response } from "express";
const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const api_res = await axiosHandler({
      method: "POST",
      url: `${config?.authentication}/auth/login`,
    });

    if (api_res?.statusCode === 200) {
      return send_success(res, "login successfully", "xxxxxxxxxx");
    } else {
      return send_success(res, "invalid", "ghjkl");
    }
  } catch (error: any) {
    return send_fail(res, error.message);
  }
});

router.post("/register", async (req: Request, res: Response) => {
  try {
    console.log("BODY:", req.body);

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
        api_res?.response?.data
      );
    } else {
      return invalid(res, api_res.response.message, api_res?.response?.data);
    }
  } catch (error: any) {
    return send_fail(res, error.message);
  }
});

export default router;
