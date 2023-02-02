const express = require("express");
const mongoose = require("mongoose");
mongoose.set('strictQuery', true)
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const reg_router = require("./src/routes/login");
const active_router = require("./src/routes/activity");
const app = express();
dotenv.config();
const port = process.env.Port || 3005
app.use(express.json());
app.use(bodyparser.json());
app.use(cors());

mongoose.connect(process.env.mongodb_URL, ()=>{
    console.log("connected to Database");
})
app.use("/todo", (req,res,next)=>{
    try {
        // console.log(req.headers);
        const token = req.headers.authorization;
        // console.log(token);
        if(token){
            const decoded = jwt.verify(token, "secret");
            // console.log(decoded.data)
            req.user = decoded.data;
            next();
        }else{
            res.status(401).json({
                status:"failed",
                message:"token is missing"
            });
        }
    } catch (error) {
        res.status(401).json({
            status:"failed",
            message:error.message
        })
    }
})

app.use("/",reg_router);
app.use("/", active_router);
app.listen(port,()=>{
    console.log(`server connected at ${port}`);
})
