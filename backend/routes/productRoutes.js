import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productModel.js'

/**
 * @desc    Fetch All Products
 * @route   GET /api/products
 * @access  Public
 */
router.get('/', async(req, res) => {
    const products = await Product.find({})
    res.json(products)
})

/**
 * @desc    Fetch A Single Product
 * @route   GET /api/products/:id
 * @access  Public
 */
router.get('/:id', async(req, res) => {
   const product = await Product.findById(req.params.id)
   if(product) {
    res.json(product);
   }else{
       res.status(404).json({message: 'Product Not Found'})
   }
})



export default router
