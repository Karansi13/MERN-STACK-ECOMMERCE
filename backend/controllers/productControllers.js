const Product = require("../models/productModel")

// Create Product -- Admin

exports.createProduct = async (req, res, next)=> {

    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })

}


// GET ALL PRODUCTS
exports.getAllProducts = async (req, res) => {

    const products = await Product.find();
    res.status(200).json({
        success:true,
        products
    })
} 

// Get Product Details

exports.getProductDetails = async(req, res, next) => {
    const product  = await Product.findById(req.params.id);

    if(!product) {
        return res.status(500).json({
            success:false,
            message:"product not found"
        })
    }

    res.status(200).json({
        success:true,
        product
    })
}


// Update product --Admin

exports.updateProduct = async (req, res, next) => {
    let product = Product.findById(req.params.id);

    if(!product) {
        return res.status(500).json({
            success:false,
            message:"product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        reuValidatore:true,
        useFindAndModify:false,
    });
    res.status(200).json({
        success:true,
        product
    })
}


// DELETE Product


exports.deleteProduct = async (req, res, next)=> {
    
    const product = await Product.findById(req.params.id);

    if(!product) {
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    await product.deleteOne()
// new docx remove() is replace by deleteOne() or deleteMany()

    res.status(200).json({
        success:true,
        message:"Product Delete Successfully"
    })
}