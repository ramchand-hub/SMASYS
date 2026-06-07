import axios from "axios"
export const axios_handler = async (config) =>{

    const context = {
        method:config?.method,
        url:config?.url
    }

    try{
        const response = await axios(context)

    }catch(error){
        console.log(error)
    }
}
