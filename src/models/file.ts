import { model, Schema } from "mongoose";
import mongoose from "mongoose";

export interface upload extends Document {
    originalname : string,
    filename:string,
    mimeType:string,
    size:string,
    path:string
}

const fileSchema = new Schema <upload>({
originalname:{type:String,required:true},
filename:{type:String,required:true},
mimeType:{type:String,required:true},
size:{type:String,required:true},
path:{type:String,required:true},

})

export default model<upload>('Upload', fileSchema);
