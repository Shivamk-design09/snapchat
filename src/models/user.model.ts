/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { mongo } from 'mongoose'

interface Iuser {
  _i?: mongoose.Types.ObjectId
  name: string
  email: string
  password: string
  mobile?: string
  role: 'user' | 'admin' | 'deliveryBoy'
}

const UserScheam = new mongoose.Schema<Iuser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: false,
    },
    role:{
        type:String,
        enum:['user' ,'admin' ,'deliveryBoy'],
        default:'user'
    }
  },

  { timestamps: true }
) 


// this means if mongoose.models have user then use it if it dosnt have any than create it
const User =mongoose.models?.User || mongoose.model("User",UserScheam)
export default User


// mongoose have models object when a new model get create it store in this and we can get the model from there 
// becausen 
