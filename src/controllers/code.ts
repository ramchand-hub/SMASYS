import mongoose from "mongoose";
import express from "express";
import { Request,Response,NextFunction } from "express";
const uri = "http://loclahost:3000"

const db = mongoose.connect(uri,{
    maxPoolSize:10,
    minPoolSize:5,
    maxIdleTimeMS:3000,
    serverSelectionTimeoutMS:5000
});


const app = express();

app.use((Request,Response,NextFunction,err)=>{

    console.log('thrown error')
})

