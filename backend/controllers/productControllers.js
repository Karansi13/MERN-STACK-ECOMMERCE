const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");

// Create Product -- Admin

exports.createProduct = catchAsyncErrors(async (req, res, next)=> {

    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })

})


// GET ALL PRODUCTS
exports.getAllProducts = catchAsyncErrors(async (req, res) => {

    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

    const products = await apiFeature.query;

    res.status(200).json({
        success:true,
        products,
        productCount,
    })
}) 

// Get Product Details

exports.getProductDetails = catchAsyncErrors(async(req, res, next) => {
    const product  = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    res.status(200).json({
        success:true,
        product
    })
})


// Update product --Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHandler("Product not found", 404))
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
})


// DELETE Product


exports.deleteProduct = async (req, res, next)=> {
    
    const product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHandler("Product not found", 404))
    }


    await product.deleteOne()
// new docx remove() is replace by deleteOne() or deleteMany()

    res.status(200).json({
        success:true,
        message:"Product Delete Successfully"
    })
}


// Create New Review or Update the review

exports.createProductReview = async (req, res, next)=> {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.body._id,
        name: req.body.name,
        rating: Number(rating),
        comment
    };

    const product = await Product.findById(productId);

    const isReviewed = product.Reviews.find((rev) => rev.user.toString() === req.user._id.toString())

    if(isReviewed){
        product.Reviews.forEach((rev)=>{
            if(rev.user.toString() === req.user._id.toString())
            (rev.rating = rating),(rev.comment = comment);
        });
    }
    else{
        product.Reviews.push(review);
        product.numOfReviews = product.Reviews.length
    }

    let avg = 0;
    product.ratings = product.Reviews.forEach((rev) => {
        avg = avg + rev.rating
    });

    product.ratings = avg / product.Reviews.length;

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true
    })
}


// Get All Reviews of a product

exports.getProductReviews = catchAsyncErrors(async(req,res,next)=>{

    const product = await Product.findById(req.query.id);

    if(!product) {
        return next(new ErrorHandler("Product not found"),404);
    }

    

    res.status(200).json({
        success:true,
        Reviews: product.Reviews,
    });
});


// Delete Review

exports.deleteReview = catchAsyncErrors(async(req,res,next)=>{

    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler("Product not found"), 404);
    }

    const reviews = product.Reviews.filter((rev) => rev._id.toString() !== req.query.id)
    

    let avg = 0;
    reviews.forEach((rev) => {
        avg = avg + rev.rating
    });

    const ratings = avg / product.Reviews.length;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success:true,
        Reviews: product.Reviews,
    });

})
