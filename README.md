# AutoNova | Car Buying & Selling Marketplace

A modern, responsive car marketplace frontend with dedicated experiences for **buyers**, **sellers/dealers**, and **admins**. Built with React and Vite.

**Live demo:** https://autonoval-car-buying-and-selling.vercel.app/

> **Project status: frontend complete, backend in progress.**
> The interface, navigation, forms, and animations are built. Data, payments, real-time messaging, and AI features currently run on mock/simulated data until the backend is integrated.

---

## Features

### Public
- Car showroom with filters (make, body type, fuel type, price range, condition), sorting, and pagination
- Car detail pages with image gallery, seller contact, and test-drive booking
- Sell landing page with a 3-step process (Value It, List It, Get Paid), testimonials, and FAQ
- Blog, About, Help Center, and Terms pages
- AI assistant chat interface (UI only, responses are mocked for now)

### Buyer / Member
- Member dashboard with stats, recent activity, and recently viewed cars
- Saved garage and saved searches
- Orders and purchase history with escrow status display
- Test-drive booking, rescheduling, and cancellation
- Messaging and in-app notifications interface
- Market trends, financing pre-qualification form, car valuation, and vehicle comparison
- Reviews and onboarding preferences flow

### Seller / Dealer
- Seller dashboard with metric cards, views-vs-inquiries chart, and offers panel
- Listings management (create, edit, deactivate, boost, delete)
- Per-listing analytics with charts and report export
- Bank details form for payouts

### Admin
- Separate admin login with a 2FA/OTP step
- System overview, user management, and listing approvals
- Orders and transactions, financials and payouts views
- Escrow ledger and security audit log views
- Content management for blog posts and FAQs
- Reviews and disputes management
- Platform settings with roles and permissions matrix

### Authentication
- Firebase Authentication (email/password and Google sign-in)
- Role selection at sign-up (Buyer, Seller, Dealer)

---

## Tech Stack

- **React** with **Vite**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **React Router**
- **Firebase Authentication**
- Deployed on **Vercel**

---

## What's Simulated Right Now

Until the backend is connected, the following use mock or simulated behavior:

- AI assistant responses (Gemini integration in progress)
- VIN lookup and car valuation
- Payments and escrow flow (Paystack integration planned)
- Real-time messaging
- Data persistence for listings, orders, and admin actions

---

## Roadmap

- [ ] Backend API and database
- [ ] Paystack payments and escrow flow
- [ ] Real-time messaging
- [ ] Gemini-powered AI assistant (server-side)
- [ ] Image uploads
- [ ] Server-enforced admin OTP and role-based access

---

## Run Locally

**Prerequisites:** Node.js

```bash
npm install
npm run dev
```

Create a `.env.local` file in the project root and add your Firebase configuration values (see the Firebase config used in the project for the variable names).

---

## Author

**Oyeniyi Feranmi**, Frontend Developer
GitHub: [@Feranmi2241](https://github.com/Feranmi2241)
