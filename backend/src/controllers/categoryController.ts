import { Request, Response } from 'express';
import categoryService from '../services/categoryService';

class CategoryController {
    // GET /categories - ดึงรายการหมวดหมู่ทั้งหมดแบบ pagination
    async getAllCategories(req: Request, res: Response): Promise<void> {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const search = req.query.search as string;

            const result = await categoryService.getAllCategories({ page, limit, search });

            res.status(200).json({
                success: true,
                data: {
                    categories: result.categories,
                    total: result.total,
                    page: result.page,
                    totalPages: result.totalPages
                }
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error fetching categories',
                error: error.message
            });
        }
    }

    // GET /category/:id - ดึงข้อมูลหมวดหมู่
    async getCategoryById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const category = await categoryService.getCategoryById(id);

            if (!category) {
                res.status(404).json({
                    success: false,
                    message: 'Category not found'
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: category
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error fetching category',
                error: error.message
            });
        }
    }

    // POST /category - เพิ่มหมวดหมู่ใหม่
    async createCategory(req: Request, res: Response): Promise<void> {
        try {
            const category = await categoryService.createCategory(req.body);

            res.status(201).json({
                success: true,
                data: category
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: 'Error creating category',
                error: error.message
            });
        }
    }

    // PUT /category/:id - แก้ไขข้อมูลหมวดหมู่
    async updateCategory(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const category = await categoryService.updateCategory(id, req.body);

            if (!category) {
                res.status(404).json({
                    success: false,
                    message: 'Category not found'
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: category
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: 'Error updating category',
                error: error.message
            });
        }
    }

    // DELETE /category/:id - ลบหมวดหมู่
    async deleteCategory(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const category = await categoryService.deleteCategory(id);

            if (!category) {
                res.status(404).json({
                    success: false,
                    message: 'Category not found'
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Category deleted successfully',
                data: category
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Error deleting category',
                error: error.message
            });
        }
    }
}

export default new CategoryController();
