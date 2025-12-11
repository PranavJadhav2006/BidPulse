import Item from "../models/Item.js"

// Get Pending items
export const getPendingItems =async (req,res) => {
    try{
        const item = await Item.find({status : "pending"}).populate("uploaded_by" , "name");
        res.status(200).json({message : "Pending Items fetcjed Successfully" , item});
    }catch(err) {
        console.log("Server Error !");
        res.status(500).json({message : err.message});
    }
}

// Approve Pending Items
export const approveItems = async(req,res) => {
    try {
        const {itemId} = req.params;
        const updatedItem = await Item.findByIdAndUpdate(itemId , {status : "approved"} , {new : true})

        if(!updatedItem) {
            return res.status.send(404).json({message : "Item does not found !"});
        }

        res.status(200).json({message : "Item Approved Successfully" , item : updatedItem});

    }catch(err) {
        console.log("Server Error !");
        res.status(500).json({message : err.message});
    }
}


export const RejectItems = async(req,res) => {
    try {
        const {itemId} = req.params;
        const updatedItem = await Item.findByIdAndUpdate(itemId , {status : "Rejected"} , {new : true})

        if(!updatedItem) {
            return res.status.send(404).json({message : "Item does not found !"});
        }

        res.status(200).json({message : "Item Rejected Successfully" , item : updatedItem});
        
    }catch(err) {
        console.log("Server Error !");
        res.status(500).json({message : err.message});
    }
}