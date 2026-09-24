import { Router } from "express";
import { Request, Response } from "express";
import { axiosHandler } from "../utils/messages/request_handler";
import config from "../../webconfig.json";
import { invalid, send_fail, send_success } from "../utils/messages/response";
import logger from "../utils/messages/logger";

const router = Router();

router.post("/createStudent", async (req: Request, res: Response) => {
  try {
    const result = req.body;
    const api_res = await axiosHandler({
      method: "POST",
      url: `${config?.student_microservice}/students/createStudent`,
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

router.get("/getStudentsList", async (req: Request, res: Response) => {
  try {
    const { page, pagesize, searchquery } = req.query;
    const api_res = await axiosHandler({
      method: "GET",
      url: `${config?.student_microservice}/students/getStudentsList`,

      params: {
        page,
        pagesize,
        searchquery
      }


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

router.put("/updateStudent/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = req.body
    const api_res = await axiosHandler({
      method: "PUT",
      url: `${config?.student_microservice}/students/updateStudent/${id}`,
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

  } catch (err: any) {
    logger.error("student is not updated", {
      error: err.message
    })
    return send_fail(res, err?.message);

  }
})


router.delete("/deleteStudent/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const api_res = await axiosHandler({
      method: "DELETE",
      url: `${config?.student_microservice}/students/deleteStudent/${id}`,
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
    logger.error("student is not deleted", {
      error: err.message
    })
    return send_fail(res, err?.message);

  }
})
export default router;
