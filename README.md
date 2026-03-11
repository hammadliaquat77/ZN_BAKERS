# 🎂 ZN Bakers — Full Stack Next.js App

## Tech Stack
- **Frontend:** Next.js 14 (App Router)
- **Backend:** Next.js API Routes
- **Database:** MongoDB + Mongoose
- **Auth:** NextAuth.js (JWT)
- **Payment:** JazzCash integration
- **Styling:** Tailwind CSS + Custom CSS

## Features
- ✅ Home page with hero, featured products, marquee
- ✅ Menu page with category filters
- ✅ Shopping cart with quantity management
- ✅ User registration & login
- ✅ Checkout with delivery details
- ✅ JazzCash / EasyPaisa / COD payment
- ✅ Admin dashboard (orders management, products CRUD)
- ✅ MongoDB database

---

## 🚀 Setup Instructions

### Step 1: Install Node.js
Download from: https://nodejs.org (LTS version)

### Step 2: Setup MongoDB
1. Go to https://mongodb.com/atlas (free tier)
2. Create a cluster
3. Get connection string

### Step 3: Configure Environment
```bash
cp .env.local.example .env.local
```
Edit `.env.local` with your values:
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/zn-bakers
NEXTAUTH_SECRET=any-random-string-here
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=admin@znbakers.pk
ADMIN_PASSWORD=YourAdminPassword123
```

### Step 4: Install & Run
```bash
npm install
npm run dev
```

### Step 5: Seed Database
Open browser: http://localhost:3000/api/seed
This adds sample products and admin account.

### Step 6: Open Website
http://localhost:3000

---

## 📱 Pages
| Page | URL |
|------|-----|
| Home | / |
| Menu | /menu |
| Cart | /cart |
| Login | /login |
| Register | /register |
| Admin | /admin |

## 🔑 Admin Login
Email: (your ADMIN_EMAIL from .env.local)
Password: (your ADMIN_PASSWORD from .env.local)

## 💳 JazzCash Payment Setup
1. Register at https://sandbox.jazzcash.com.pk
2. Get merchant credentials
3. Add to .env.local

---

Made with ❤️ — ZN Bakers
