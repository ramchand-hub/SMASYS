import Router from "express"
import { Request, Response } from "express"
import { axiosHandler } from "../utils/messages/request_handler";
import config from "../../webconfig.json"
import { send_success, invalid, send_fail } from "../utils/messages/response";
import logger from "../utils/messages/logger";
const router = Router()

router.post("/createTimetable", async (req: Request, res: Response) => {

    try {
        const result = req.body;
        const api_res = await axiosHandler({
            method: "POST",
            url: `${config?.teacher_microservice}/timetables/createTimetable`,
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
})

router.get("/timetablesList", async (req: Request, res: Response) => {

    try {
        const { page, pagesize, class_id } = req.query;
        const api_res = await axiosHandler({
            method: "GET",
            url: `${config?.teacher_microservice}/timetables/timetablesList`,
            params: {
                page,
                pagesize,
                class_id
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
})

export default router