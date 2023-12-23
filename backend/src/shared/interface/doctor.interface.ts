export interface IDoctor{
    name:string;
    specialization:string[];
    appointment:IAppointment[];
}
export interface IAppointment{
    datetime:Date;
    booked:boolean;
    patientId?:string;
}