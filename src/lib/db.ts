/* eslint-disable @typescript-eslint/no-unused-vars */

import mongoose from "mongoose"

//we will get the connection from global
const mongodbUrl = process.env.MONGODB_URI
if(!mongodbUrl){
     throw new Error("DB Error")
}

let cached = global.mongoose
//if cache have nothing put assign cache give null to each property
// and if cache have somethign it will not come in this
if(!cached){
    cached = global.mongoose = {conn:null ,promise:null }
}
// we will call this connecDb function in every api
const connectDb = async()=>{
    // if cached.conn is true we will return it here only
        if(cached.conn){
            return cached.conn
        }
        if(!cached.promise){
            cached.promise = mongoose.connect(mongodbUrl).then((conn)=>conn.connection)
        }
        try{
            const conn = await cached.promise
            return conn
        }catch(error){
            console.log(error)
        }
}

export default connectDb