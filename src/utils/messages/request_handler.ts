import axios from "axios"
import logger from "./logger"
export const axios_handler = async (config) =>{

    const context = {
        method:config?.method,
        url:config?.url
    }

    try{
        const response = await axios(context)

    }catch(error){
        logger.info(error)      
        if(axios.isAxiosError(error)){

            const status = error?.response?.status;
            const data = error?.response?.data

             if (
        error.code === "ECONNREFUSED" ||
        error.code === "ETIMEDOUT" ||
        error.code === "ECONNABORTED" ||
        error.code === "ECONNRESET"
      ) {
        logger.error('service unavailable, please try again later...')
      }

      if(error?.response){
        logger.error('API request was failed with response',{
            ...context,
            status,
            data
        })

        return{
            statuscode:error?.response?.status,
            response:error?.response?.data
        }
      }
        }

        
    }
}
