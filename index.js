const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const app = express()
app.use(express.json())
app.use(cors({origin:"http://localhost:2000",allowedHeaders: "auth-token", exposedHeaders: ["auth-token"]}))
app.use("/api/auth", require("./routes/auth"))
app.use("/api/product", require("./routes/product"))
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
.then(()=>{
        console.log("connected to Mongodb")
}).catch((error)=>{
    console.log(error)
})
const PORT = process.env.PORT || 5000
app.listen(PORT,()=> {
    console.log("PORT"+PORT) 
})