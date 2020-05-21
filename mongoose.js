const mongoose = require("mongoose");

const Product = require("./models/product");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to database!"))
  .catch(() => console.log("Connection failed!"));

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price
  });

  const result = await createdProduct.save();

  res.json(result);
};

const getProducts = async (req, res, next) => {
  const products = await Product.find().exec(); // .exec() turns find() to a real promise

  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
