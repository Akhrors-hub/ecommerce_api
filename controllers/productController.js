const Product = require("../models/Product")
const mongoose  =require("mongoose")

exports.getAllProducts = async (req,res)=> {
    try {
        const products = await Product.find();
        console.log(products)
        res.json(products);
      } catch (error) {
        console.error('Error fetching products', error);
        res.status(500).json({ error: 'Internal server error' });
      }
} 
exports.getProductById = async (req,res)=>{
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      console.error('Error fetching product', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}

exports.createProduct = async (req,res)=>{
   const {name,price,description,category,inStock,imageURL} = req.body
    try {
  const newProduct = new Product({name,price,description,category,inStock,imageURL})
  await newProduct.save()
      res.json(newProduct);
    } catch (error) {
      console.error('Error fetching product', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}


exports.updateProduct = async (req,res)=>{
  const {name,price,description,category,inStock,imageURL, _id} = req.body
  console.log(_id)
  try {
    const updateProduct = await Product.findByIdAndUpdate(new mongoose.Types.ObjectId(_id),{name,price,description,category,inStock,imageURL}, {new :true}).lean().exec()
 if(updateProduct){
  console.log(updateProduct)
  return res.json(updateProduct)

 }else{
  return res.status(400).json({ error: "Product id is not found"})
 }
  
   } catch (error) {
     console.error('Error fetching product', error);
     res.status(500).json({ error: 'Internal server error' });
   }
}