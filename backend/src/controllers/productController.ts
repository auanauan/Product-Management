import { Request, Response } from 'express';
import productService from '../services/productService';

class ProductController {
    // GET /products
    async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const { page, limit, search, categoryId } = req.query;
            const result = await productService.getAll(
                Number(page) || 1,
                Number(limit) || 10,
                String(search || ''),
                String(categoryId || '')
            );

            res.status(200).json({
                success: true,
                data: {
                    products: result.data,
                    total: result.pagination.total,
                    page: result.pagination.page,
                    totalPages: result.pagination.pages
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: (error as Error).message
            });
        }
    }

    // GET /product/:id
    async getProduct(req: Request, res: Response): Promise<void> {
        try {
            const product = await productService.getById(req.params.id);

            res.status(200).json({
                success: true,
                data: product
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: (error as Error).message
            });
        }
    }

    // POST /product
    async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const product = await productService.create(req.body);

            res.status(201).json({
                success: true,
                data: product
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: (error as Error).message
            });
        }
    }

    // PUT /product/:id
    async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            const product = await productService.update(req.params.id, req.body);

            res.status(200).json({
                success: true,
                data: product
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: (error as Error).message
            });
        }
    }

    // DELETE /product/:id
    async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            await productService.delete(req.params.id);

            res.status(200).json({
                success: true,
                message: 'Product deleted successfully'
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: (error as Error).message
            });
        }
    }
}

export default new ProductController();
