
const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({ data });
    });
};
exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: "Category don't exist"
            });
        }
        req.category = category;
        next();
    });
};
exports.read = (req, res) => {
    return res.json(req.category);
};

exports.remove = (req, res) => {
    let product =req.product;
    product.remove((err,deleteProduct)=>{
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        } 
        res.json({
            deleteProduct,
            message:"product delete successfully"
        });
    });
};

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        let product = req.product;
        const {
            name,
            description,
            category
        } = fields;
        product =_.extend(product,fields);
        
        if(!name||!description||!category){
            return res.status(400).json({
                error: "All field require"
            });
        }
        if (files.photo) {
            //console.log('FILE PHOTO',files.photo);
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }
        if(files.photo.size>5000000){
            //5mb=5,000,000
            return res.status(400).json({
                error: "Image size sould  be less than 5mb"
            });
        }
        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};