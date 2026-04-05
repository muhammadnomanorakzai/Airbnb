# 🏡 Wanderlust — Airbnb-Style Property Listing Platform

A full-stack web application for discovering, listing, and reviewing properties worldwide. Built with **Node.js**, **Express**, **MongoDB**, and **EJS**, featuring user authentication, cloud image storage, and a responsive UI.

---

## 📖 About

Wanderlust is a production-ready property listing platform where users can:

- Browse and explore property listings with images, descriptions, and locations
- Create, edit, and delete their own listings
- Leave reviews and ratings on properties
- Sign up, log in, and manage their account securely

Designed to be clean, intuitive, and production-grade — suitable for portfolio showcases and real-world deployment.

---

## ✨ Features

- 🔐 **User Authentication** — Secure sign-up, login, and logout with Passport.js & session management
- 📝 **CRUD Operations** — Full Create, Read, Update, Delete for property listings
- ⭐ **Review System** — Users can rate and review properties (1–5 stars with comments)
- 🖼️ **Cloudinary Image Upload** — Seamless cloud-based image storage with Multer integration
- ✅ **Server-Side Validation** — Joi schema validation for all forms and user inputs
- 👤 **Ownership Authorization** — Only owners can edit or delete their listings and reviews
- 💬 **Flash Messages** — User-friendly success and error notifications
- 🎨 **Responsive UI** — EJS templating with layout reuse and clean styling
- 🚀 **Production-Ready** — Environment variable configuration, error handling, and deployment support (Vercel, Railway)

---

## 🛠 Tech Stack

| Layer        | Technology                                        |
| ------------ | ------------------------------------------------- |
| **Backend**  | Node.js, Express.js, Express Router               |
| **Database** | MongoDB, Mongoose ODM                             |
| **Auth**     | Passport.js, Passport-Local, passport-local-mongoose, express-session |
| **Storage**  | Cloudinary, Multer, multer-storage-cloudinary     |
| **Views**    | EJS, ejs-mate (layout templating)                 |
| **Validation**| Joi (server-side schema validation)              |
| **Utilities** | method-override, connect-flash, dotenv, nodemon  |
| **Deployment**| Vercel (configured), Railway-ready               |

---

## 🏗 Architecture Overview

```
┌──────────────────────────────────────────────────────┐
│                     Client (Browser)                 │
└────────────────────┬─────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────┐
│                  Express Server (app.js)             │
│  ┌────────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │  Routes    │→ │Middleware│→ │  Controllers     │  │
│  │ (3 routers)│  │(auth,    │  │ (listings,       │  │
│  │            │  │ validate,│  │  reviews, users) │  │
│  └────────────┘  └──────────┘  └──────────────────┘  │
└────────────────────┬─────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────┐
│                  MongoDB Database                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │ Listing  │  │  Review  │  │   User   │           │
│  └──────────┘  └──────────┘  └──────────┘           │
└──────────────────────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────┐
│              Cloudinary (Image Storage)              │
└──────────────────────────────────────────────────────┘
```

---

## 📦 Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas cloud)
- [Cloudinary Account](https://cloudinary.com/) (free tier works)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-username/Wanderlust.git
cd Wanderlust

# 2. Install dependencies
yarn install
# or: npm install

# 3. Create environment file
cp .env.example .env

# 4. Add your environment variables (see below)

# 5. Start development server
yarn dev
# or: npm run dev
```

The app will be available at `http://localhost:8080`

---

## 🔑 Environment Variables

Create a `.env` file in the project root with the following:

```env
# MongoDB Connection String
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/wanderlust

# Session Secret (use a strong random string)
SESSION_SECRET=your_super_secret_session_key

# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Port (optional, defaults to 8080)
PORT=8080
```

> ⚠️ **Never commit your `.env` file** — it's already listed in `.gitignore`.

---

## 🚀 Usage Guide

### Development Mode

```bash
yarn dev
```

Starts the server with **nodemon** for auto-reload on file changes.

### Production Mode

```bash
yarn start
```

Starts the server without file watching. Suitable for deployment.

### Deploying to Vercel

The project includes a `vercel.json` configuration. Simply push to your repository and connect to Vercel, or run:

```bash
vercel
```

### Deploying to Railway

1. Connect your GitHub repo to [Railway](https://railway.app/)
2. Add environment variables in the Railway dashboard
3. Railway auto-deploys on push

---

## 📡 API Endpoints

### Listings

| Method | Route               | Description                | Auth Required |
| ------ | ------------------- | -------------------------- | ------------- |
| GET    | `/listings`         | View all listings          | No            |
| GET    | `/listings/new`     | New listing form           | Yes           |
| POST   | `/listings`         | Create a new listing       | Yes           |
| GET    | `/listings/:id`     | View single listing        | No            |
| GET    | `/listings/:id/edit`| Edit listing form          | Yes (Owner)   |
| PUT    | `/listings/:id`     | Update listing             | Yes (Owner)   |
| DELETE | `/listings/:id`     | Delete listing             | Yes (Owner)   |

### Reviews

| Method | Route                            | Description          | Auth Required     |
| ------ | -------------------------------- | -------------------- | ----------------- |
| POST   | `/listings/:id/reviews`          | Create a review      | Yes               |
| DELETE | `/listings/:id/reviews/:reviewId`| Delete a review      | Yes (Review Auth) |

### Users

| Method | Route       | Description        | Auth Required |
| ------ | ----------- | ------------------ | ------------- |
| GET    | `/signup`   | Signup form        | No            |
| POST   | `/signup`   | Register new user  | No            |
| GET    | `/login`    | Login form         | No            |
| POST   | `/login`    | Authenticate user  | No            |
| GET    | `/logout`   | Log out user       | Yes           |

---

## 📸 Screenshots

> 📷 _Add screenshots here_

| Home Page | Listing Detail | Create Listing |
| --------- | -------------- | -------------- |
| ![Home](./screenshots/home.png) | ![Show](./screenshots/show.png) | ![New](./screenshots/new.png) |

| Login Page | Reviews |
| ---------- | ------- |
| ![Login](./screenshots/login.png) | ![Reviews](./screenshots/reviews.png) |

---

## 🌐 Live Demo

> 🔗 _Add live demo URL here after deployment_

**[Visit Live Demo](https://your-deployed-app.vercel.app)**

---

## 📁 Folder Structure

```
Wanderlust/
├── app.js                  # Main application entry point
├── package.json            # Project metadata & dependencies
├── schema.js               # Joi validation schemas
├── middleware.js           # Custom middleware (auth, validation, ownership)
├── cloudConfig.js          # Cloudinary configuration
├── vercel.json             # Vercel deployment config
├── .env                    # Environment variables (not tracked)
│
├── models/                 # Mongoose schemas
│   ├── listing.js          # Listing model (with review cascade delete)
│   ├── review.js           # Review model (rating, comment, author)
│   └── user.js             # User model (with passport-local-mongoose)
│
├── routes/                 # Express routers
│   ├── listing.js          # Listing CRUD routes
│   ├── review.js           # Review create/delete routes
│   └── user.js             # Auth routes (signup, login, logout)
│
├── controller/             # Route handlers (business logic)
│   ├── listings.js         # Listing controller
│   ├── reviews.js          # Review controller
│   └── users.js            # User/auth controller
│
├── views/                  # EJS templates
│   ├── layout/             # Base layout templates
│   ├── listings/           # Listing pages (index, show, new, edit)
│   ├── users/              # Auth pages (login, signup)
│   └── include/            # Reusable partials (navbar, footer, etc.)
│
├── public/                 # Static assets
│   ├── css/                # Stylesheets
│   └── js/                 # Client-side scripts
│
├── utils/                  # Utility functions
│   ├── ExpressError.js     # Custom error class
│   └── wrapAsync.js        # Async error wrapper
│
└── init/                   # Database seeding scripts (if any)
```

---

## 🧩 Challenges & Solutions

| Challenge | Solution |
| --------- | -------- |
| **Cascade Deleting Reviews** | Used Mongoose `findOneAndDelete` post-hook to automatically delete associated reviews when a listing is deleted |
| **Async Error Handling** | Created a `wrapAsync` utility to avoid repetitive try-catch blocks in route handlers |
| **Image Upload Security** | Integrated Cloudinary with Multer for secure, cloud-based storage instead of local file system |
| **Authorization Checks** | Built custom `isOwner` and `isReviewAuthor` middleware to ensure only resource owners can modify/delete |
| **Session Persistence After Redirect** | Saved `redirectUrl` in session before login, then restored it post-authentication for seamless UX |
| **Server-Side Validation** | Implemented Joi schemas to validate all user inputs and prevent malformed data from reaching the database |

---

## 🔮 Future Improvements

- [ ] Add search and filter functionality for listings (by location, price, country)
- [ ] Implement pagination for listing index
- [ ] Add Google Maps integration for property locations
- [ ] User profile page with listing history and avatar
- [ ] Wishlist / bookmark feature for saved listings
- [ ] Email notifications for new reviews
- [ ] Rate limiting and brute-force protection
- [ ] Add unit and integration tests with Jest/Supertest
- [ ] Frontend form validation with real-time feedback
- [ ] Dark mode toggle

---

## 👤 Author

**Your Name**

- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [linkedin.com/in/your-profile](https://linkedin.com/in/your-profile)

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<p align="center">Made with ❤️ and Node.js</p>
