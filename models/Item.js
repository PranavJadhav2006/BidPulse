const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    } ,

    description : {
        type : String,
        required : true
    },

    image : {
        type : String,
        required : true
    },

    base_price : {
        type : Number,
        required : true
    },

    uploaded_by : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    } ,

    status : {
        type : String,
        enum : ['Pending' , 'Approved' , 'Rejected'],
        default : 'pending'
    }
},{timestamps : true});

const Item = mongoose.model("Item" , ItemSchema)
module.exports = Item;