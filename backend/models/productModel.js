const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please enter product name"],
        trim:true
    },
    description:{
        type:String,
        required: [ true,"Please enter product Description"]
    },
    price:{
        type:Number,
        required: [ true,"Please enter product Price"],
        maxLength:[8,"Price cannot exceed 8 digits"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[   // here we are using cloudinary (it provies a url)
    {  // Array of objects
        public_id:{
            type: String,
            required:true,
        },
        url:{
            type:String,
            required:true
        }
    }
],
    category:{
        type:String,
        required:[true,"Please Enter Product Category"]
    },
    Stock:{
        type:Number,
        required:[true,"Please Enter product Stock"],
        maxLength:[4,"Stock cannot exceed 4 characters"]
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    Reviews:[
        {
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true,
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Product", productSchema);