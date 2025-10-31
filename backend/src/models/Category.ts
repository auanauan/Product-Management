import mongoose, { Document, Schema } from 'mongoose';

// Plain object interface (for lean queries)
export interface ICategoryBase {
    _id: any;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

// Document interface (for Mongoose documents)
export interface ICategory extends Document {
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true,
        unique: true
    },
    description: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

// สร้าง text index สำหรับการค้นหาที่รวดเร็ว
categorySchema.index({ name: 'text', description: 'text' });

// สร้าง index สำหรับการเรียงลำดับ
categorySchema.index({ createdAt: -1 });

export default mongoose.model<ICategory>('Category', categorySchema);
