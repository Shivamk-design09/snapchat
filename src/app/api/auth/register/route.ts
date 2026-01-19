/* eslint-disable @typescript-eslint/no-unused-vars */
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
         await connectDb()
        // use await due to it can take time to get data from frontend
        const {name, email , password}  = await req.json()
        
        const existUser = await User.findOne({email}) // we can write in key value in email but both are same so we are writing email only in object
        if(existUser){
            return NextResponse.json(
                {message:"user exist"},
                {status:400}
            )
        }

        if(password.length<6){
             return NextResponse.json(
                {message:"password leangthn should be at least 6 character"},
                {status:400}
            )
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            name,email,password:hashedPassword   
        })

        return NextResponse.json(
           user,
           {status:200}
        )

    }catch(error){
        return NextResponse.json(
            {message:`register error ${error}`}
            {status:500}
        )
    }
}
//first rule always connect the db
// always connect the db 
//name , email, password 
// check if email exist or not
//if email exist return user
// make the password hash
//  create an user
