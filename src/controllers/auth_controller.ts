import { Router } from "express";
import config from "../../webconfig.json";
import { axiosHandler } from "../utils/messages/request_handler";
import { send_fail, send_success } from "../utils/messages/response";
import { Request, Response } from "express";
import { error } from "node:console";
const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const api_res = await axiosHandler({
      method: "POST",
      url: `${config?.authentication}/auth/login`,
    });


    if (api_res?.statusCode === 200) {
      return send_success(res, "login successfully", "xxxxxxxxxx");
    }
    else{
        return send_success(res,'invalid',"ghjkl")
    }
  } catch (error: any) {
    return send_fail(res, error.message);
  }
});

export default router;
