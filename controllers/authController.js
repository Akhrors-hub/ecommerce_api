const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
exports.register = async (req,res)=> {
    try {
        const {email,password} = req.body
        const userExist = await User.findOne({email:email})
        if (userExist){
            return res.status(400).json({error:"email already exist"})
        }
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password,salt)
        const newUser = new User({email,password:hashPassword})
        await newUser.save()
        const token = jwt.sign({_id:newUser._id},process.env.JWT_SECRET,{expiresIn:600})
        res.header("auth-token",token).json({msg:"user Created",user: newUser})
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error})
    }
} 
exports.login = async (req,res)=>{
    try {
        const {email,password} = req.body
        const user = await User.findOne({email:email})
        if (!user){
            return res.status(400).json({error:"email is not found"})
        }
       
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword){
            return res.status(400).json({error:"password is not valid"})
        }
        
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET, {expiresIn:600})
        res.header("auth-token",token).json({msg:"User logged in", user})
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: "server error"})
    }
}