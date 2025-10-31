import Category, { ICategory, ICategoryBase } from '../models/Category';

interface PaginationOptions {
    page?: number;
    limit?: number;
    search?: string;
}

interface PaginatedResult {
    categories: ICategoryBase[];
    total: number;
    page: number;
    totalPages: number;
}

class CategoryService {
    // ดึงรายการหมวดหมู่ทั้งหมด พร้อม pagination และ search
    async getAllCategories(options: PaginationOptions = {}): Promise<PaginatedResult> {
        const { page = 1, limit = 10, search } = options;
        const skip = (page - 1) * limit;

        // สร้าง query สำหรับ search
        const query: any = {};
        if (search && search.trim()) {
            // ใช้ regex สำหรับรองรับการค้นหาทุกภาษา รวมถึงภาษาไทย
            query.$or = [
                { name: { $regex: search.trim(), $options: 'i' } },
                { description: { $regex: search.trim(), $options: 'i' } }
            ];
        }

        const [categories, total] = await Promise.all([
            Category.find(query)
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
                .lean(), // ใช้ lean() เพื่อลดการใช้ memory
            Category.countDocuments(query)
        ]);

        return {
            categories,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        };
    }

    // ดึงข้อมูลหมวดหมู่ตาม ID
    async getCategoryById(id: string): Promise<ICategoryBase | null> {
        return await Category.findById(id).lean();
    }

    // สร้างหมวดหมู่ใหม่
    async createCategory(categoryData: Partial<ICategory>): Promise<ICategory> {
        const category = new Category(categoryData);
        return await category.save();
    }

    // แก้ไขข้อมูลหมวดหมู่
    async updateCategory(id: string, categoryData: Partial<ICategory>): Promise<ICategory | null> {
        return await Category.findByIdAndUpdate(
            id,
            categoryData,
            { new: true, runValidators: true }
        );
    }

    // ลบหมวดหมู่ (hard delete)
    async deleteCategory(id: string): Promise<ICategory | null> {
        return await Category.findByIdAndDelete(id);
    }
}

export default new CategoryService();
