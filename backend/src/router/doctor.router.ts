import { Router, Request, Response } from "express";
import asyncHandler from "express-async-handler"
import { DoctorModel } from "./doctor.model";
const router = Router()

router.post("/add-doctor",asyncHandler (async(req:Request,res:Response)=>{
 try {
    const { name, specialization } = req.body
    const doctorData = {name,specialization:specialization}
    await DoctorModel.create(doctorData).then((data)=>{
        console.log(data)
        res.status(200).send({data:doctorData})
    })
    
 }catch (error) {
    res.status(500).json("internal server down")
 }
}))
router.post("/add-slot", asyncHandler (async (req,res)=>{
    try {
        const { datetime,doctorId } = req.body
        const doctorData = await DoctorModel.findOne({_id:doctorId})
        if(doctorData){
            doctorData.appointment.push({
                datetime:new Date(datetime),
                booked:false
            })
            await doctorData.save().then((data)=>{
                res.status(200).send({data:doctorData})
            })

        }else{
            res.status(401).json("only added doctor please contact admin")
        }
        
        
    } catch (error) {
        res.status(500).json("internal server down")
    }
}))

export default router