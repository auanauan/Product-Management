# ระบบจัดการสินค้า (Product Management System)

ระบบจัดการสินค้าที่พัฒนาด้วย Vue.js และ Node.js พร้อม MongoDB เป็นฐานข้อมูล

## เทคโนโลยีที่ใช้

### Frontend
- **Vue 3** - Progressive JavaScript Framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool
- **Vue Router** - Official router for Vue.js
- **Axios** - HTTP client
- **SweetAlert2** - Beautiful popup boxes

### Backend
- **Node.js** + **Express** - Web framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** + **Mongoose** - NoSQL database และ ODM
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variables management

## โครงสร้างโปรเจกต์

```
Pd Management/
├── frontend/                 # Vue.js Frontend
│   ├── src/
│   │   ├── components/      # Vue components
│   │   ├── views/           # Page views
│   │   ├── router/          # Vue Router configuration
│   │   ├── services/        # API services
│   │   └── types/           # TypeScript type definitions
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                  # Express Backend
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   └── scripts/         # Utility scripts (e.g., seed data)
│   ├── server.ts
│   └── package.json
│
└── README.md                 # This file
```

## การติดตั้ง

### ข้อกำหนดเบื้องต้น
- Node.js (แนะนำเวอร์ชัน 16 ขึ้นไป)
- MongoDB (ติดตั้งและรันบนเครื่อง หรือใช้ MongoDB Atlas)
- npm หรือ yarn

### ขั้นตอนการติดตั้ง

1. Clone repository
```bash
git clone <repository-url>
cd "Pd Management"
```

2. ติดตั้ง dependencies สำหรับ Backend
```bash
cd backend
npm install
```

3. ติดตั้ง dependencies สำหรับ Frontend
```bash
cd ../frontend
npm install
```

4. สร้างไฟล์ `.env` ในโฟลเดอร์ `backend` พร้อมกำหนดค่าต่อไปนี้:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/product-management
```

## การรันโปรเจกต์

### รัน Backend (Development Mode)

```bash
cd backend
npm run dev:watch          # รันพร้อม auto-reload
# หรือ
npm run dev               # รันแบบธรรมดา
```

Backend จะรันที่ `http://localhost:5000`

### รัน Frontend (Development Mode)

```bash
cd frontend
npm run dev
```

Frontend จะรันที่ `http://localhost:5173` (Vite default port)

### รัน Production

#### Backend
```bash
cd backend
npm run build             # Compile TypeScript
npm start                 # รัน production server
```

#### Frontend
```bash
cd frontend
npm run build             # Build สำหรับ production
npm run preview           # Preview production build
```

## Scripts ที่มีให้ใช้งาน

### Backend Scripts
- `npm run dev` - รัน development server
- `npm run dev:watch` - รัน development server พร้อม auto-reload
- `npm run build` - Compile TypeScript เป็น JavaScript
- `npm start` - รัน production server
- `npm run seed` - Seed ข้อมูลเริ่มต้นเข้าฐานข้อมูล

### Frontend Scripts
- `npm run dev` - รัน development server
- `npm run build` - Build สำหรับ production
- `npm run preview` - Preview production build
- `npm run type-check` - ตรวจสอบ TypeScript types

## API Endpoints

Backend API endpoints จะอยู่ที่ `http://localhost:5000/api/`

(สามารถดูรายละเอียด endpoints เพิ่มเติมได้จากไฟล์ `backend/src/routes/`)

## Features

- ระบบจัดการสินค้า (CRUD operations)
- UI ที่ทันสมัยและใช้งานง่ายด้วย Vue 3
- RESTful API backend
- Type-safe development ด้วย TypeScript
- Responsive design

## ผู้พัฒนา

สำหรับข้อมูลเพิ่มเติม กรุณาดูที่ไฟล์ `Playbook - ระบบจัดการสินค้า.docx`
