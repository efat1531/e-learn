# E-Learning Platform

A full-stack e-learning platform built with Node.js, Express, React, and MongoDB. This platform allows students to browse and purchase courses, instructors to create and manage courses, and administrators to manage the platform.

## 🚀 Features

- **Student Features:**

  - Browse and search courses
  - Purchase courses with multiple payment methods (Stripe, AmarPay)
  - Watch video lectures and access course materials
  - Track course progress
  - Leave reviews and ratings
  - Student dashboard for managing purchases

- **Instructor Features:**

  - Apply to become an instructor
  - Create and manage courses
  - Upload video content and course materials
  - View course analytics and reviews
  - Instructor dashboard

- **Admin Features:**
  - Manage instructor applications
  - Oversee all courses and users
  - Admin dashboard with analytics

## 🛠️ Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer for file uploads
- Nodemailer for emails
- Payment integration (Stripe, AmarPay)

### Frontend

- React.js
- Redux Toolkit for state management
- Vite for build tooling
- Tailwind CSS for styling
- Ant Design components
- Formik for form handling

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas)
- [Git](https://git-scm.com/)

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd e-learn
```

### 2. Install Dependencies

Install dependencies for both backend and frontend:

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Environment Setup

Create a `.env` file in the root directory by copying the example file:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration values:

```env
# Port Number
PORT = 8088

# Development Mode
NODE_ENV = development

# Database URL Local (for local MongoDB)
MONGODB_LOCAL = mongodb://localhost:27017/elearn

# Database URL Production (for MongoDB Atlas)
MONGODB_PROD = mongodb+srv://username:password@cluster.mongodb.net/elearn

# JWT Configuration
JWT_SECRET = your-super-secret-jwt-key-here
JWT_EXPIRES_IN = 30d

# Email Configuration (for sending emails)
EMAIL = your-email@gmail.com
EMAIL_PASSWORD = your-app-password

# Crypto Configuration
CRYPTO_SECRET_KEY = your-crypto-secret-key
CRYPTO_SECRET_ALGORITHM = aes-256-cbc

# Stripe Payment Configuration
STRIPE_PUBLISHABLE_KEY = pk_test_your-stripe-publishable-key
STRIPE_SECRET_KEY = sk_test_your-stripe-secret-key

# Frontend URL
FRONTEND_BASE_URL = http://localhost:5173

# AmarPay Configuration (Bangladesh payment gateway)
AMARPAY_BASE_URL = https://sandbox.aamarpay.com
AMARPAY_STORE_ID = your-store-id
AMARPAY_SIGNATURE_KEY = your-signature-key
```

### 4. Database Setup

Make sure MongoDB is running on your system:

```bash
# For Windows (if installed locally)
net start MongoDB

# For Linux
sudo systemctl start mongod
```

### 5. Start the Application

You have several options to run the application:

#### Option A: Run Both Frontend and Backend Concurrently (Recommended for Development)

```bash
npm run dev
```

This will start:

- Backend server on http://localhost:8088
- Frontend development server on http://localhost:5173

#### Option B: Run Frontend and Backend Separately

**Terminal 1 (Backend):**

```bash
npm run server
```

**Terminal 2 (Frontend):**

```bash
npm run client:dev
```

#### Option C: Production Mode

```bash
# Build the frontend
npm run build

# Start the production server
npm start
```

### 6. Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8088
- **API Documentation:** http://localhost:8088/api (if implemented)

## 🔧 Configuration Details

### Database Configuration

The application supports both local MongoDB and MongoDB Atlas:

- **Local MongoDB:** Set `MONGODB_LOCAL` in your `.env` file
- **MongoDB Atlas:** Set `MONGODB_PROD` in your `.env` file and change `NODE_ENV` to `production`

### Email Configuration

For email functionality (user verification, password reset):

1. Use Gmail with App Password:
   - Enable 2-factor authentication on your Gmail account
   - Generate an App Password
   - Use your Gmail address and the App Password in the `.env` file

### Payment Gateway Setup

#### Stripe

1. Create a Stripe account at https://stripe.com
2. Get your publishable and secret keys from the dashboard
3. Add them to your `.env` file

#### AmarPay (Bangladesh)

1. Contact respective payment providers for merchant accounts
2. Add credentials to your `.env` file

## 📂 Project Structure

```
e-learn/
├── backend/
│   ├── config/          # Database and CORS configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── server.js        # Main server file
├── frontend/
│   ├── public/          # Static files
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── features/    # Redux slices and API
│   │   ├── utils/       # Utility functions
│   │   └── css/         # Stylesheets
│   └── package.json
├── .env.example         # Environment variables template
├── package.json         # Backend dependencies
└── README.md
```

## 🚀 Available Scripts

### Root Directory Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run server` - Start backend server with nodemon
- `npm run client:dev` - Start frontend development server
- `npm start` - Start backend in production mode
- `npm run build` - Build the entire application for production

### Frontend Scripts (run with `cd frontend && npm run <script>`)

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)

1. Build the frontend:

   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `dist` folder to your hosting service

### Backend Deployment (Railway/Render/Heroku)

1. Set environment variables in your hosting platform
2. Ensure `NODE_ENV=production`
3. Use MongoDB Atlas for database
4. Deploy using your platform's CLI or Git integration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/verify` - Verify user account

### Courses

- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create new course (instructor only)
- `GET /api/courses/:id` - Get single course
- `PUT /api/courses/:id` - Update course (instructor only)
- `DELETE /api/courses/:id` - Delete course (instructor/admin)

### Users

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (admin only)

### Orders

- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order

## ❓ Troubleshooting

### Common Issues

1. **Port already in use:**

   ```bash
   # Kill process using port 8088
   npx kill-port 8088
   ```

2. **MongoDB connection error:**

   - Check if MongoDB service is running
   - Verify connection string in `.env` file
   - For Atlas, check network access and credentials

3. **Module not found errors:**

   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Frontend build errors:**
   ```bash
   # Clear frontend cache
   cd frontend
   rm -rf node_modules package-lock.json dist
   npm install
   npm run build
   ```

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- Built as a university project by Efat Sikder.
- Special thanks to the instructors and students who provided feedback

---

**Happy Learning! 🎓**
