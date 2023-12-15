import mongoose, { connect,ConnectOptions } from "mongoose";
export const dbConnect = () => {

try {
    connect("mongodb://127.0.0.1:27017/Register", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions).then(() => {
        console.log("Database connected");
    });
} catch (error) {
    console.log("error", error);
}

};