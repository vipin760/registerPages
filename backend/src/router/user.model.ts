import {Schema,model} from "mongoose"
import { IUser } from "../shared/interface/user.interface"

const userSchema =new Schema<IUser>({
    username:{type:String, required:true},
    email:{type:String, required:true,unique:true},
    phone:{type:String, required:true},
    password:{type:String, required:true},
},
    {
        timestamps:true,
        toJSON:{
            virtuals:true
        },
        toObject:{
            virtuals:true
        }
    })

export  const UserModel = model<IUser>('user',userSchema)

