import dotenv from 'dotenv';
// โหลดค่าตัวแปรจากไฟล์ .env มาใช้ในโปรเจกต์
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
// นำ Express.js มาใช้งาน (เว็บเฟรมเวิร์ก)

import cors from 'cors';
// นำ CORS มาใช้เพื่อให้ API สามารถถูกเรียกจากโดเมนอื่นได้

import connectDB from './src/config/database';
// นำฟังก์ชันเชื่อมต่อฐานข้อมูล MongoDB มาใช้งาน

import routes from './src/routes';
// นำไฟล์ routes ของโปรเจกต์มาใช้งาน

const app = express();
// สร้างแอปพลิเคชัน Express

const PORT = process.env.PORT || 5000;
// กำหนดพอร์ตของเซิร์ฟเวอร์จาก .env หรือถ้าไม่มีใช้ 5000

// Middleware
app.use(cors());
// ใช้ CORS middleware

app.use(express.json());
// ให้ Express สามารถอ่านข้อมูล JSON จาก body ของ request

app.use(express.urlencoded({ extended: true }));
// ให้ Express สามารถอ่านข้อมูลจาก form URL-encoded

// Connect to MongoDB
connectDB();
// เรียกใช้ฟังก์ชันเชื่อมต่อฐานข้อมูล MongoDB

// Routes
app.use(routes);
// ใช้ routes ที่กำหนดไว้ทั้งหมด

// Health check route
app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Product Management API',
        status: 'Running'
    });
});
// สร้าง API / สำหรับเช็คว่าเซิร์ฟเวอร์ยังทำงานอยู่

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});
// Middleware สำหรับจับข้อผิดพลาด ถ้าอยู่ในโหมด development จะแสดงข้อความ error

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
// เริ่มรันเซิร์ฟเวอร์บนพอร์ตที่กำหนด
