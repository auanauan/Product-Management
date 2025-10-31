import mongoose, { Document, Schema } from 'mongoose';
import { ICategory } from './Category';

export interface IProduct extends Document {
    name: string;
    description?: string;
    price: number;
    stock: number;
    categoryId: ICategory['_id'];
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    stock: {
        type: Number,
        default: 0,
        min: [0, 'Stock cannot be negative']
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    }
}, {
    timestamps: true
});

export default mongoose.model<IProduct>('Product', productSchema);
