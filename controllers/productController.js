const Product = require("../models/Product")


exports.getAllProducts = async (req,res)=> {
    try {
        const products = await Product.find();
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