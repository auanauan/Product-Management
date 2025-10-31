import express from 'express';
import categoryController from '../controllers/categoryController';

const router = express.Router();

// GET /categories - ดึงรายการหมวดหมู่ทั้งหมดแบบ pagination
router.get('/categories', categoryController.getAllCategories.bind(categoryController));

// GET /category/:id - ดึงข้อมูลหมวดหมู่
router.get('/category/:id', categoryController.getCategoryById.bind(categoryController));

// POST /category - เพิ่มหมวดหมู่ใหม่
router.post('/category', categoryController.createCategory.bind(categoryController));

// PUT /category/:id - แก้ไขข้อมูลหมวดหมู่
router.put('/category/:id', categoryController.updateCategory.bind(categoryController));

// DELETE /category/:id - ลบหมวดหมู่
router.delete('/category/:id', categoryController.deleteCategory.bind(categoryController));

export default router;
