import express from 'express';
import categoryRoutes from './categoryRoutes';
import productRoutes from './productRoutes';

const router = express.Router();

// รวม routes ทั้งหมด
router.use('/api', categoryRoutes);
router.use('/api', productRoutes);

export default router;
