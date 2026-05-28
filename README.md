# Actual - Invoice & Payment Platform

## Overview
Actual is a production-ready invoicing and payment collection platform. This backend provides a complete REST API for invoice management, payment processing, and analytics.

## Quick Start

### Prerequisites
- Node.js >= 18.0.0
- PostgreSQL >= 12
- Redis >= 6.0

### Installation

```bash
npm install
cp .env.example .env
# Edit .env with your configuration
npm run migrate
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Invoices
- `GET /api/invoices` - Get all invoices
- `POST /api/invoices` - Create invoice
- `GET /api/invoices/:id` - Get invoice details
- `PATCH /api/invoices/:id` - Update invoice
- `DELETE /api/invoices/:id` - Delete invoice

### Payments
- `POST /api/payments/intent` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard stats

### Users
- `GET /api/users/profile` - Get user profile
- `PATCH /api/users/profile` - Update profile

## Environment Variables

See `.env.example` for all required environment variables.

## Architecture

```
├── config/          # Configuration files
├── models/          # Database models
├── routes/          # API routes
├── middleware/      # Express middleware
├── controllers/     # Business logic (upcoming)
├── utils/           # Utility functions
├── tests/           # Test suites
└── server.js        # Entry point
```

## Security Features

- ✅ Helmet.js for HTTP headers
- ✅ CORS configuration
- ✅ Rate limiting
- ✅ Input validation
- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ SQL injection prevention
- ✅ CSRF protection

## Database Schema

### Users
- UUID primary key
- Email (unique)
- Password (hashed)
- Subscription management
- Profile information

### Invoices
- UUID primary key
- Invoice number (unique)
- Client details
- Items (JSON)
- Status tracking
- Tax calculations

### Payments
- UUID primary key
- Payment intent
- Multiple payment methods
- Status tracking
- Fee calculation

## Testing

```bash
npm test                  # Run all tests
npm run test -- --watch  # Watch mode
npm run test -- --coverage
```

## Deployment

### Docker
```bash
docker build -t actual-invoicing .
docker run -p 3000:3000 actual-invoicing
```

### Production Checklist
- [ ] Set NODE_ENV=production
- [ ] Use environment variables for all secrets
- [ ] Configure SSL/TLS
- [ ] Set up database backups
- [ ] Configure monitoring and alerting
- [ ] Enable rate limiting
- [ ] Set up CDN for static files
- [ ] Configure email service
- [ ] Set up payment gateway (Stripe)
- [ ] Enable logging and monitoring

## Contributing
1. Create feature branch
2. Make changes
3. Add tests
4. Submit PR

## License
MIT
