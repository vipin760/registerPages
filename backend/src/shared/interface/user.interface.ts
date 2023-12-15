export interface IUser{
    username:string;
    email:string;
    phone:string;
    password:string;
}
interface value{
    username:string;
    email:string;
}
export interface IUser_Register_Response{
    data:value;
    message:string
}