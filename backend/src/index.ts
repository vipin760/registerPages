import express from "express";
import user_router from "./router/user.router";
import doctor_router from "./router/doctor.router"
import cors from "cors";
import { dbConnect } from "./config/config";
const app = express();

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);
dbConnect();
app.use(express.json());

app.use("/api/user", user_router);
app.use("/api/doctor",doctor_router);
app.listen(3000, () => {
  console.log("server start");
});
