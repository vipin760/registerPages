import { Schema, model } from "mongoose";
import { IDoctor } from "../shared/interface/doctor.interface";
import { IAppointment } from "../shared/interface/doctor.interface";

const appointmentSchema = new Schema<IAppointment>({
    datetime:{ type:Date},
    booked:{ type:Boolean, default:false},
    patientId:{type:String}
    })

const doctorSchema = new Schema<IDoctor>({
    name:{ type:String, required:true},
    specialization:{ type:[String], required: true},
    appointment:[appointmentSchema]
})

export const DoctorModel = model<IDoctor>("doctor",doctorSchema)