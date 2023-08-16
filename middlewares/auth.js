const jwt = require("jsonwebtoken")
const User = require("../models/User")

const auth = (type)=> async (req,res,next)=> {
try{
    const token = req.header["auth-token"]
    if(!token){
        console.log("no auth-token header")
        return res.status(401).json({error:"not authorized, please login"})
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    let userSearch = {_id:decoded._id}
    if(type){
        userSearch = {_id: decoded._id,type}
    }
    const user = await User.findOne(userSearch)
    req.user = user
    const newToken = jwt.sign({_id:user._id},process.env.JWT_SECRET, {expiresIn:600})
    res.header("auth-token",newToken)
    next()
}catch(err){
console.log(err)
res.status(500).json({error: "general server error"})
}
}
exports.authUser = auth()
exports.authAdmin = auth("Admin")