# 💸 PayTM Clone

Welcome to the **PayTM Clone** project!
This application replicates the core functionality of a digital wallet platform like PayTM, enabling users to securely manage accounts, check balances, and transfer money between users.

---

## 🚀 Features

* 🔐 **User Authentication & Authorization**

  * Secure login/signup using JWT (JSON Web Tokens)

* 💰 **View Account Balance**

  * Real-time balance display for users

* 🔎 **Search Users**

  * Find and view other registered users

* 💸 **Send Money**

  * Transfer funds instantly between users

* 🧾 **Transaction Handling**

  * Reliable and consistent transactions using MongoDB

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB

---

## 🔄 Database Transactions

This project uses **MongoDB Transactions** to ensure:

* ✅ **Atomicity** – Transactions complete fully or not at all
* ✅ **Consistency** – Data remains valid after transactions
* ✅ **Isolation** – Transactions do not interfere with each other
* ✅ **Durability** – Data is safely stored after commit

This prevents issues like:

* Double spending
* Partial updates
* Data inconsistency

---

## 📁 Project Structure

```
PayTM-Clone/
│
├── frontend/        # React frontend
├── backend/         # Node + Express backend
├── models/          # Database models
├── routes/          # API routes
├── controllers/     # Business logic
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Sayan-2607/Paytm.git
cd paytm-clone
```

### 2. Install dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

---

### 3. Environment Variables

Create a `.env` file in the backend folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

### 4. Run the application

#### Start backend

```bash
npm run dev
```

#### Start frontend

```bash
npm start
```

---

## 📌 API Endpoints (Sample)

| Method | Endpoint      | Description         |
| ------ | ------------- | ------------------- |
| POST   | /api/signup   | Register user       |
| POST   | /api/signin   | Login user          |
| GET    | /api/balance  | Get account balance |
| GET    | /api/users    | Search users        |
| POST   | /api/transfer | Send money          |

---

## 🤝 Contributing

Contributions are welcome! 🚀

To contribute:

1. Fork the repository
2. Create a new branch (`feature/your-feature`)
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

---

## ⭐ Acknowledgements

Inspired by the functionality of modern digital wallets like PayTM.

---

### 💡 Future Improvements

* Add transaction history
* Integrate payment gateway
* Add notifications system
* Improve UI/UX


