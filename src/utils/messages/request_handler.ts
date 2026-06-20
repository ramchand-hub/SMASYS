import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import logger from "../messages/logger";
import { ApiRequestError } from '../messages/custom_error'

interface ApiResponseInterface {
  statusCode: number;
  response: {
    success: boolean;
    message: string;
    data?: any;
  };
}

export const axiosHandler = async (
  config: AxiosRequestConfig,
): Promise<ApiResponseInterface> => {
  const context = {
    url: config.url,
    method: config.method?.toUpperCase() || "UNKNOWN",
  };

  try {
    const response: AxiosResponse = await axios(config);

    logger.info("API request successful", {
      ...context,
      status: response.status,
    });

    return {
      statusCode: response.status,
      response: response.data,
    };
  } catch (error) {
   if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const data = error.response?.data;
     
    
      if (
        error.code === "ECONNREFUSED" ||
        error.code === "ETIMEDOUT" ||
        error.code === "ECONNABORTED" ||
        error.code === "ECONNRESET"
      ) {
        throw new ApiRequestError(
          "Service unavailable, please try again later",
        );
      }
      if (error.response) {
        logger.error("API request failed with response", {
          ...context,
          status,
          data,
        });

    return {
         statusCode: error.response.status,
         response: error.response.data,
        //  message:error.response.data.message
         }
      }
    }
    logger.error("Unexpected non-Axios error in axiosHandler", {
      ...context,
      errorMessage: error instanceof Error ? error.message : String(error),
      errorStack: error instanceof Error ? error.stack : undefined,
    });

    throw new ApiRequestError("Unexpected error occurred");
  }
};
