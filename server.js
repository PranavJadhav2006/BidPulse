import express from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 5000;

import cors from "cors"

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

import authRoutes from "./routes/authRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";

app.use('/api/auth' , authRoutes);
app.use('/api/seller' , sellerRoutes);

mongoose.connect(process.env.MONGO_URL , {useNewUrlParser : true , useUnifiedTopology : true})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.log(err);
})

app.listen(PORT , (req,res)=> {
    console.log(`Server is running on port ${PORT}`);
});
