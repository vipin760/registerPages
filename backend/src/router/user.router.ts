import { Router, Request, Response } from "express";
import { UserModel } from "./user.model";
import bcrypt from "bcryptjs"
import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer" 
const router = Router()

router.post("/register",async(req:Request,res:Response)=>{
 try {
    const {username, email, phone, password} = req.body
    const userExist = await UserModel.findOne({email:email})
    if(!userExist){
        const passwordHash = await bcrypt.hash(password,10)
        const saveUser = new UserModel({username,email: email.toLowerCase(),phone,password:passwordHash})
        await saveUser.save().then((data)=>{
            res.status(200).send({data:data.username, message:"user registred successfully"})
        }).catch((error)=>{
            res.status(400).send({data:null,message:"cannot regitser try after some times"})
        })
    }else{
        res.status(401).send({data:null, message:"user already exist"})
    }
 } catch (error) {
    res.status(500).send({data:null, message:"internal server down"})
 }    
})
////////////////////////////////////////////////////////////////////////////
router.post("/login",asyncHandler(async(req:Request,res:Response)=>{
    try {
        const {email,password} =req.body
        console.log(req.body)
        const userData = await UserModel.findOne({email:email})
        
        if(userData&&await bcrypt.compare(password,userData?userData.password:'')){
            res.status(200).send({data:userData.username,message:"login successfully"})
        }else{
            res.status(401).send({data:null,message:"incorrect email or password"})
        }
    } catch (error) {
        res.status(500).send({data:null, message:"internal server down"})
    }
}))

////////////////////////////////////////////////////////////////////////////
var transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"vipinm500@gmail.com",
        pass:"ugyh ilhh gsnl xiro"
    },
    tls:{
        rejectUnauthorized:false
    }
})
router.post("/email-url",asyncHandler( async(req:Request,res:Response)=>{
    try {
        console.log("working")
        const user = await UserModel.findOne({email:req.body.email})
        if(user){
            const emailToken = jwt.sign({id:user._id,email:user.email},"thisrandon",{expiresIn:'1min'})
            console.log("email",emailToken)
            var mailOption = {
                from:` "verify your email" <vipinm500@gmail.com> `,
                to:user.email,
                subject:"hello please verify your email",
                html:`<h2> ${user.username} thanks for registering </h2>
                    <h4>please verify ypu emmail and continue....</h4>
                    <a href="http://${req.headers.host}/reset-password/${emailToken}">verify email</a>`
            }
            transporter.sendMail(mailOption, function(err,info){
                if(err){ 
                    console.log(err)
                    res.status(401).json("error occuring please try after some times")
                }else{
                   res.status(200).json("email send in your prividing email please verify")
                }
            })


        }else{
            res.status(401).json("email is not found in our list so please check your email properly")
        }
    } catch (error) {
        res.status(500).json("internal server down")
    }
}))


////////////////////////////////////////////////////////////////////////////
router.post("/reset-passsword/:id",asyncHandler( async(req:Request,res:Response)=>{
    try {
        console.log("working")
        const token = req.params.id
        const {password, cpassword} = req.body
        const checkToken:any = jwt.verify(token,"thisrandon") 
        console.log("checkToken",checkToken.id)
        const userData = await UserModel.findOne({_id:checkToken.id})
       if(userData){
        const passwordHash = await bcrypt.hash(password,10)
        const updatePassword:any = await UserModel.updateOne({email:userData.email},{$set:{password:passwordHash}}).then((data)=>{
            if(data.modifiedCount===1){
                console.log("updtaed")
                res.status(200).json("password updated successfully")
            }
            console.log("not updated")
        })
        

       }else{
        res.status(401).json("token is expired please try after some times")
       }
      
        
    } catch (error) {
        res.status(500).json("token is expired please try after some times")
    }
}))
////////////////////////////////////////////////// 1702539767,
////  exp: 1702541567//////////////////////////
////////////////////////////////////////////////////////////////////////////
export default router