# 🎀 Scoopsy — Cute Mini Korean Gifts

> Small Gifts, Big Joy! A full-stack MERN e-commerce store for cute Korean-inspired gifts.

---

## 🌸 Features

- **Product Catalogue** — Keychains, Bracelets, Goggles/Sunnies, Accessories, Plushies, Stationery, Bags, Beauty
- **Category Filtering & Search** — Browse by category, sort by price/rating, live search
- **Product Detail Pages** — Emoji-rich product cards with ratings, badges, discount tags
- **Shopping Cart** — Add/remove/update qty, free shipping threshold, persistent cart
- **User Auth** — Register, Login, JWT-based sessions
- **Wishlist** — Save favourite products
- **Checkout & Orders** — Full checkout flow with COD/UPI, order history, tracking
- **Admin Panel** — Add/Edit/Delete products, manage & update order statuses
- **Scoop Gift Boxes** — Mini / Medium / Large / Premium curated gift concepts
- **Fully Responsive** — Mobile-first design, works on all screen sizes
- **Kawaii Design** — Pink palette, Pacifico + Nunito fonts, floating emoji animations

---

## 🛠️ Tech Stack

| Layer    | Tech                          |
|----------|-------------------------------|
| Frontend | React 18, React Router v6     |
| Backend  | Node.js, Express.js           |
| Database | MongoDB + Mongoose            |
| Auth     | JWT + bcryptjs                |
| Styling  | Pure CSS (no framework)       |
| Toasts   | react-hot-toast               |

---

## ⚡ Quick Start

### Prerequisites
- **Node.js** v16+ — https://nodejs.org
- **MongoDB** running locally — https://www.mongodb.com/try/download/community
  - Or use **MongoDB Atlas** (free cloud): https://www.mongodb.com/atlas

---

### Step 1 — Install Dependencies

```bash
# In the root folder (scoopsy/)
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

Or use the shortcut (requires the root install first):
```bash
npm run install-all
```

---

### Step 2 — Configure Environment

The backend `.env` file is already created at `backend/.env`:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/scoopsy
JWT_SECRET=scoopsy_secret_key_change_in_production
NODE_ENV=development
```

**Using MongoDB Atlas?** Replace `MONGODB_URI` with your Atlas connection string:
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/scoopsy
```

---

### Step 3 — Seed the Database

```bash
cd backend
npm run seed
```

This creates:
- ✅ **22 products** across all 8 categories
- ✅ **Admin user**: `admin@scoopsy.com` / `admin123`

---

### Step 4 — Run the App

**Option A — Run both together (recommended):**
```bash
# From root folder
npm run dev
```

**Option B — Run separately:**
```bash
# Terminal 1 — Backend (port 5000)
cd backend
npm run dev

# Terminal 2 — Frontend (port 3000)
cd frontend
npm start
```

---

### Step 5 — Open in Browser

- 🌸 **Frontend**: http://localhost:3000
- ⚙️ **Backend API**: http://localhost:5000
- 👑 **Admin Panel**: http://localhost:3000/admin *(login as admin first)*

---

## 🔑 Admin Access

| Field    | Value                |
|----------|----------------------|
| Email    | admin@scoopsy.com    |
| Password | admin123             |

Login → click your avatar → **Admin Panel**

---

## 📁 Project Structure

```
scoopsy/
├── backend/
│   ├── models/
│   │   ├── Product.js      # Product schema
│   │   ├── User.js         # User schema + password hashing
│   │   └── Order.js        # Order schema
│   ├── routes/
│   │   ├── products.js     # CRUD product routes
│   │   ├── auth.js         # Login, register, profile, wishlist
│   │   ├── orders.js       # Create & fetch orders
│   │   └── cart.js         # Cart validation
│   ├── middleware/
│   │   └── auth.js         # JWT auth + admin middleware
│   ├── server.js           # Express app entry point
│   ├── seed.js             # Database seeder
│   └── .env                # Environment config
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── Navbar.js / .css
│       │   ├── Footer.js / .css
│       │   └── ProductCard.js / .css
│       ├── context/
│       │   └── AppContext.js   # Cart + Auth global state
│       ├── pages/
│       │   ├── Home.js / .css
│       │   ├── Products.js / .css
│       │   ├── ProductDetail.js / .css
│       │   ├── Cart.js / .css
│       │   ├── Checkout.js / .css
│       │   ├── OrderSuccess.js / .css
│       │   ├── Orders.js / .css
│       │   ├── About.js / .css
│       │   ├── Admin.js / .css
│       │   └── Auth.js / .css
│       ├── App.js
│       └── index.js
│
└── package.json            # Root scripts
```

---

## 🌐 API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (filter, sort, paginate) |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product *(admin)* |
| PUT | `/api/products/:id` | Update product *(admin)* |
| DELETE | `/api/products/:id` | Delete product *(admin)* |

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/profile` | Get user profile *(auth)* |
| PUT | `/api/auth/profile` | Update profile *(auth)* |
| POST | `/api/auth/wishlist/:id` | Toggle wishlist *(auth)* |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Place order *(auth)* |
| GET | `/api/orders/my` | My orders *(auth)* |
| GET | `/api/orders/admin/all` | All orders *(admin)* |
| PUT | `/api/orders/:id/status` | Update status *(admin)* |

---

## 🎀 Product Categories

- 🔑 Keychains
- 💎 Bracelets
- 🕶️ Goggles & Sunglasses
- 🎀 Accessories (scrunchies, hair clips, bobby pins)
- 🧸 Plushies
- ✏️ Stationery
- 👜 Bags
- 💋 Beauty

---

## 💡 Notes

- Cart data persists in **localStorage**
- Product images use placeholder emoji rendering (no image hosting needed)
- To add real images, update `product.images[]` with URLs and render `<img>` in ProductCard
- Scoop gift box orders are handled via Instagram DM (by design)

---

## 🌸 Made with love for Scoopsy
> Because every little thing matters 💕
