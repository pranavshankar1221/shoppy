# ShopEasy E-Commerce Application

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed (download from https://www.mongodb.com/try/download/community)

### Backend Setup

1. Navigate to backend folder:
```bash
cd d:\shoppy\backend
```

2. Install dependencies:
```bash
npm install
```

3. Make sure MongoDB is running on your system

4. Start the backend server:
```bash
npm start
```

The backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd d:\shoppy\frontend\E-commerce
```

2. Install dependencies (if not already done):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on http://localhost:5173

### Features

- User Registration and Login with MongoDB
- Product browsing with images
- Shopping cart with quantity management
- Total bill calculation
- Multiple UPI payment options (Google Pay, PhonePe, Paytm, Amazon Pay)
- Responsive design for all devices
- User session management

### Demo Mode

If the backend is not running, the app will work in demo mode with mock authentication.

### API Endpoints

- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- GET /api/products - Get all products
- POST /api/products/seed - Seed initial products (run once)

### Troubleshooting

If you see "Registration failed":
1. Make sure MongoDB is running
2. Make sure backend server is running on port 5000
3. Check console for detailed error messages
4. The app will work in demo mode if backend is unavailable