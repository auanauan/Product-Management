import Product, { IProduct } from '../models/Product';

interface PaginationResult {
    data: IProduct[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

class ProductService {
    async getAll(page: number = 1, limit: number = 10, search: string = '', categoryId: string = ''): Promise<PaginationResult> {
        const skip = (page - 1) * limit;

        // สร้าง query สำหรับ search ด้วย RegEx
        const query: any = {};
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // เพิ่มเงื่อนไขสำหรับกรองตาม categoryId
        if (categoryId) {
            query.categoryId = categoryId;
        }

        const products = await Product.find(query)
            .populate('categoryId', 'name description') // ดึงข้อมูล category มาด้วย
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(String(limit)));

        const total = await Product.countDocuments(query);

        return {
            data: products,
            pagination: {
                page: parseInt(String(page)),
                limit: parseInt(String(limit)),
                total,
                pages: Math.ceil(total / limit)
            }
        };
    }

    async getById(id: string): Promise<IProduct> {
        const product = await Product.findById(id).populate('categoryId', 'name description');
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }

    async create(data: Partial<IProduct>): Promise<IProduct> {
        const product = await Product.create(data);
        return product;
    }

    async update(id: string, data: Partial<IProduct>): Promise<IProduct> {
        const product = await Product.findByIdAndUpdate(
            id,
            data,
            { new: true, runValidators: true }
        );

        if (!product) {
            throw new Error('Product not found');
        }

        return product;
    }

    async delete(id: string): Promise<IProduct> {
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            throw new Error('Product not found');
        }

        return product;
    }
}

export default new ProductService();
