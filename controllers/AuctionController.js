import Auction from "../models/Auction.js"
import Item from "../models/Item.js"
import mongoose from "mongoose"

// Helper function to normalise the status based on times 
const computeStatus = (auction) => {
    const now = new Date();
    if(now < auction.startTime) {
        return "scheduled"
    }
    if(now >= auction.startTime && now <= auction.endTime) {
        return "live"
    }
    return "ended"
}

// Create Auction
export const createAuction = async(req,res) => {
    try{
        const {itemId , startTime , endTime , basePrice,gavelExtention} = req.body;
        const item = await Item.findById(itemId);

        if(!itemId || !startTime || !endTime || !basePrice || !gavelExtention) {
            return res.status(404).json({message : "All fields are required !"})
        }

        const start = new Date(startTime);
        const end = new Date(endTime);

        if(isNan(start) || isNan(end)){
            return res.status(400).json({message : "Invalid Date Format"});
        }

        if (start >= end) {
            return res.status(400).json({ message: "startTime must be before endTime" });
        }

        if(item.status != "approved") {
            return res.status(400).json({message : "Item Must be Approved for Auction !"});
        }

        const existing = await Auction.findOne(itemId);
        if(existing) {
            res.status(400).json({message : "Auction Already Exists for this item !"});
        }

        const auction = await Auction.create({
            itemId,
            createdBy : req.user.id,
            startTime : start,
            endTime : end,
            basePrice,
            gavelExtention : typeof gavelExtention === 'number' ? gavelExtention : 10,
            status : "Scheduled",
        });
        return res.status(201).json({message : "Auction Created Successfully" , auction});
    }catch(err){
        res.status(500).json({message : err.message});
    }
}

export const getAuctionByStatus = async(req,res) => {
    try{
        const {status} = req.query;
        let filter = {};
        if(status){
            if(!["scheduled" , "live" , "ended"].includes(status)) {
                return res.status(400).json({message : "Invalid Status"});
            }
            filter.status = status;
        }

        const auctions = await Auction.find(filter)
        .populate("itemId" , "title imageUrl")
        .populate("highestBidder" , "username email")
        .sort({startTime : 1});

        const result = auctions.map((a) => {
              const computed = computeStatus(a);
             return { ...a.toObject(), computedStatus: computed };
        })

           return res.status(200).json({ auctions: result });
    }catch(err){
        res.status(500).json({message : err.message});
    }
}

// Get single auction by id
export const getAuctionById = async (req, res) => {
  try {
    const { auctionId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(auctionId)) {
      return res.status(400).json({ message: "Invalid auctionId" });
    }

    const auction = await Auction.findById(auctionId)
      .populate("itemId")
      .populate("highestBidder", "username email");

    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    const computed = computeStatus(auction);
    return res.status(200).json({ auction: { ...auction.toObject(), computedStatus: computed } });
  } catch (err) {
    console.error("getAuctionById error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};