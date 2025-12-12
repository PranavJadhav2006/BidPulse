const mongoose = require('mongoose');

const AuctionSchema = new mongoose.Schema({
    itemId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Item',
        required : true
    },

    startTime : {
        type : Data,
        required : true,
    },

    endTime : {
        type : Data,
        required : true,
    },

    basePrice : {
        type : Number,
        required : true
    },

    highestBid : {
        type : Number,
        default : 0
    },

    highestBidder : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    status : {
        type : String,
        enum : ['Scheduled' , 'Live' , 'Ended']
    },
    gavelExtention : {
        type : Number,
        default : 10
    },
}, {timestamps : true});

const Auction = mongoose.model('Auction' , AuctionSchema);

module.exports = Auction;