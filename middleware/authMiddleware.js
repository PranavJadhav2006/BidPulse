import jwt from "jsonwebtoken";

const authMiddleWare = (req , res , next) => {
    const token = req.header('Authorization');
    if(!token){
        res.status(400).json({message : "Access Denied"});
    }
    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err) {
        req.status.send(400).json({message : "Invalid Token"});
    }
}

export default authMiddleWare;
