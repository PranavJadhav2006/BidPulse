import item from "../models/Item.js";

export const addItem = async(req,res) => {
    try{
        const {title , description , base_price } = req.body;
        
        if(!req.file) {
            return res.status(400).json({message: "Image is required !"});
        }

        const newItem = Item.create({
            title,
            description,
            base_price,
            imageUrl : req.file.path,
            uploaded_by : req.user.id,
            status : 'pending'
        }) 

        res.send(201).json({message : "Item Submitted Successfully ! Pending Admin Approval" , item : newItem});
        

    }catch(err){
        res.status(500).json({message : err.message});
    }
}