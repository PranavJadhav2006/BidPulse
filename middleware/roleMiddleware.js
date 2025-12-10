export const allowRoutes = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)) {
            return res.status(401).json({message : "Access Denied , You Do not have permission !"})
        }

        next();
    }
}