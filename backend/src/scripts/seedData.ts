import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Category from '../models/Category';
import Product from '../models/Product';

// ข้อมูลจาก fake API ที่คุณมี
const fakeApiData = [
    {
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest...",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
    },
    {
        "id": 2,
        "title": "Mens Casual Premium Slim Fit T-Shirts",
        "price": 22.3,
        "description": "Slim-fitting style, contrast raglan long sleeve...",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
    },
    {
        "id": 3,
        "title": "Mens Cotton Jacket",
        "price": 55.99,
        "description": "great outerwear jackets for Spring/Autumn/Winter...",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
    },
    {
        "id": 4,
        "title": "Mens Casual Slim Fit",
        "price": 15.99,
        "description": "The color could be slightly different...",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"
    },
    {
        "id": 5,
        "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
        "price": 695,
        "description": "From our Legends Collection, the Naga was inspired by...",
        "category": "jewelery",
        "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"
    },
    {
        "id": 6,
        "title": "Solid Gold Petite Micropave",
        "price": 168,
        "description": "Satisfaction Guaranteed. Return or exchange any order within 30 days...",
        "category": "jewelery",
        "image": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg"
    },
    {
        "id": 7,
        "title": "White Gold Plated Princess",
        "price": 9.99,
        "description": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring...",
        "category": "jewelery",
        "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg"
    },
    {
        "id": 8,
        "title": "Pierced Owl Rose Gold Plated Stainless Steel Double",
        "price": 10.99,
        "description": "Rose Gold Plated Double Flared Tunnel Plug Earrings...",
        "category": "jewelery",
        "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg"
    },
    {
        "id": 9,
        "title": "WD 2TB Elements Portable External Hard Drive - USB 3.0",
        "price": 64,
        "description": "USB 3.0 and USB 2.0 Compatibility Fast data transfers...",
        "category": "electronics",
        "image": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg"
    },
    {
        "id": 10,
        "title": "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
        "price": 109,
        "description": "Easy upgrade for faster boot up, shutdown, application load...",
        "category": "electronics",
        "image": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg"
    },
    {
        "id": 11,
        "title": "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III",
        "price": 109,
        "description": "3D NAND flash are applied to deliver high transfer speeds...",
        "category": "electronics",
        "image": "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg"
    },
    {
        "id": 12,
        "title": "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
        "price": 114,
        "description": "Expand your PS4 gaming experience, Play anywhere...",
        "category": "electronics",
        "image": "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg"
    },
    {
        "id": 13,
        "title": "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
        "price": 599,
        "description": "21.5 inches Full HD (1920 x 1080) widescreen IPS display...",
        "category": "electronics",
        "image": "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg"
    },
    {
        "id": 14,
        "title": "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor",
        "price": 999.99,
        "description": "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR...",
        "category": "electronics",
        "image": "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg"
    },
    {
        "id": 15,
        "title": "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
        "price": 56.99,
        "description": "Note:The Jackets is US standard size...",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg"
    },
    {
        "id": 16,
        "title": "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
        "price": 29.95,
        "description": "100% POLYURETHANE(shell) 100% POLYESTER(lining)...",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg"
    },
    {
        "id": 17,
        "title": "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
        "price": 39.99,
        "description": "Lightweight perfet for trip or casual wear...",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg"
    },
    {
        "id": 18,
        "title": "MBJ Women's Solid Short Sleeve Boat Neck V",
        "price": 9.85,
        "description": "95% RAYON 5% SPANDEX, Made in USA or Imported...",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg"
    },
    {
        "id": 19,
        "title": "Opna Women's Short Sleeve Moisture",
        "price": 7.95,
        "description": "100% Polyester, Machine wash, 100% cationic polyester interlock...",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg"
    },
    {
        "id": 20,
        "title": "DANVOUY Womens T Shirt Casual Cotton Short",
        "price": 12.99,
        "description": "95%Cotton,5%Spandex, Features: Casual, Short Sleeve...",
        "category": "women's clothing",
        "image": "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg"
    }
];

interface FakeApiProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

async function seedDatabase() {
    try {
        // เชื่อมต่อ MongoDB จาก .env file
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/product-management';

        if (!process.env.MONGODB_URI) {
            console.warn('⚠️  Warning: MONGODB_URI not found in .env file, using default local MongoDB');
        }

        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // ลบข้อมูลเก่าทั้งหมด
        await Category.deleteMany({});
        await Product.deleteMany({});
        console.log('✅ Cleared old data');

        // 1. แยก unique categories
        const uniqueCategories = [...new Set(fakeApiData.map(item => item.category))];
        console.log(`📦 Found ${uniqueCategories.length} unique categories:`, uniqueCategories);

        // 2. สร้าง Category documents
        const categoryMap = new Map<string, string>(); // map: category name -> ObjectId

        for (const categoryName of uniqueCategories) {
            const category = await Category.create({
                name: categoryName,
                description: `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} products`
            });
            categoryMap.set(categoryName, String(category._id));
            console.log(`✅ Created category: ${categoryName} (${category._id})`);
        }

        // 3. สร้าง Product documents พร้อม categoryId
        let createdCount = 0;
        for (const item of fakeApiData) {
            const categoryId = categoryMap.get(item.category);

            if (!categoryId) {
                console.log(`⚠️ Warning: Category not found for ${item.category}`);
                continue;
            }

            await Product.create({
                name: item.title,
                description: item.description,
                price: item.price,
                stock: Math.floor(Math.random() * 50) + 10, // random stock 10-60
                categoryId: categoryId
            });
            createdCount++;
        }

        console.log(`✅ Created ${createdCount} products`);
        console.log('\n🎉 Seed completed successfully!');

        // แสดงสรุปข้อมูล
        const totalCategories = await Category.countDocuments();
        const totalProducts = await Product.countDocuments();
        console.log(`\n📊 Summary:`);
        console.log(`   Categories: ${totalCategories}`);
        console.log(`   Products: ${totalProducts}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

// รัน script
seedDatabase();
