import express from 'express';
import productController from '../controllers/productController';

const router = express.Router();

router.get('/products', productController.getAllProducts);
router.get('/product/:id', productController.getProduct);
router.post('/product', productController.createProduct);
router.put('/product/:id', productController.updateProduct);
router.delete('/product/:id', productController.deleteProduct);

export default router;
