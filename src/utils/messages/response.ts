import {Response} from "express"
import { error } from "node:console"

export const send_success = <T>(res:Response,message:string,data:T,statuscode=200) => {

    res.status(statuscode).json({
        success:true,
        message,
        data:data
    })
}

export const invalid = <T>(res:Response,message:string,data:T,statuscode=400) => {

    res.status(statuscode).json({
        success:false,
        message,
        data:[]
    })
}

export const send_fail = (res:Response,message:string,statuscode=500)=>{
    res.status(statuscode).json({
        success:false,
        message
    })

}