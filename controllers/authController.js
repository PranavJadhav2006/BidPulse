import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async(req,res) => {
    try{
        const {name , email , password , confirm_password , role} = req.body;
        const user = await User.findOne({email});
        if(user) {
            return res.status(400).json({message : "User already exists"});
        } else {
            if(password !== confirm_password){
                return res.status(400).json({message : "Password does not match"});
            }else {
            const hashedPassword = await bcrypt.hash(password , 10);
            const newUser = new User({name , email , hashedPassword , role : role || 'user'});
            await newUser.save();
            res.status(201).json({message : "User created Successfully !"});
          }
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({message : error.message});
    }
}

export const login = async(req,res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message : "User does not exist"});
        } else {
            const isMatch = await bcrypt.compare(password , user.password);
            if(!isMatch) {
                res.status(400).json({message : "Invalid Credentials"});
            } else {
                const payLoad = {
                    id : user._id,
                    role:user.role,
                    email:user.email,
                }
                const token = jwt.sign({id : user._id} , process.env.JWT_SECRET , {expiresIn : "7d"});
                res.status(200).json({message : "Login Successfull" , 
                                      token,
                                      user : {
                                        id : user._id,
                                        name : user.name,
                                        email : user.email,
                                        role : user.role,
                            }
                });

            }
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({message : err.message});
    }
}