# 📦 Inventory Management System (IMS)

> **A robust, full-stack inventory solution designed to solve stock visibility issues for AEC (Architecture, Engineering, Construction) material businesses.**

---

## 🚀 Live Demo

- **Frontend (Dashboard):** [https://inventory-management-system-tau-six.vercel.app/](https://inventory-management-system-tau-six.vercel.app/)

---

## 📖 Table of Contents

- [Problem Statement](#-problem-statement)
- [Solution Overview](#-solution-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Author](#-author)

---

## 🚩 Problem Statement

Indian material businesses often struggle with a lack of visibility over inventory levels. This "black box" operation leads to:

1. **Dead Inventory:** Capital stuck in poor-performing SKUs.
2. **Lost Sales:** Stock-outs happening without warning.
3. **Manual Errors:** Reliance on pen-and-paper or fragmented Excel sheets.

---

## 💡 Solution Overview

This application provides a **centralized digital dashboard** that tracks stock in real-time. It replaces manual logs with a system that records every Check-In and Check-Out, enforcing SKU standardization and providing automated low-stock alerts.

---

## ✨ Key Features

### 📊 **Real-Time Dashboard**
- Visual overview of **Total Stock Count** and **Total Inventory Value**.
- Instant updates whenever items are added or removed.

### 🚨 **Low Stock Alerts**
- Automatic detection of items below their `minLevel`.
- **Red Badge Indicators** highlight critical items needing reordering.
- Proactive alerts preventing stock-outs before they happen.

### 📦 **Inventory Management**
- **Add New Items:** Detailed form with validation for Name, SKU, Category, Price, and Quantity.
- **Duplicate Prevention:** Backend logic ensures no two items share the same SKU.

### 🔄 **Stock Transactions**
- **Check-In (Stock In):** Add quantity to existing items seamlessly.
- **Check-Out (Stock Out):** Remove stock with validation (prevents negative inventory).
- **Transaction Logging:** (Backend ready) Tracks movement history.

---

## 🛠 Tech Stack

| Component | Technology | Description |
|:----------|:-----------|:------------|
| **Frontend** | Next.js, TypeScript | Next.js 14 (App Router), React, Lucide Icons |
| **Styling** | Tailwind CSS | Responsive, utility-first design |
| **Backend** | Node.js, Express.js | REST API, Error Handling, Middleware |
| **Database** | MongoDB | MongoDB Atlas (Cloud), Mongoose ODM |
| **Deployment** | Vercel, Render | Frontend on Vercel, Backend on Render |

---

## ⚡ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/RohitGoyal13/inventory-management-system.git
cd inventory-management-system
```

### 2. Backend Setup

Navigate to the server folder and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the server folder:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start the Server:

```bash
npm run dev
# Server runs on http://localhost:5000
```

### 3. Frontend Setup

Open a new terminal, navigate to the client folder, and install dependencies:

```bash
cd client
npm install
```

Start the Client:

```bash
npm run dev
# App runs on http://localhost:3000
```

---

## 🔑 Environment Variables

### Backend (`server/.env`)

| Variable | Description | Example |
|:---------|:------------|:--------|
| `MONGO_URI` | Connection string for MongoDB Atlas | `mongodb+srv://user:pass@cluster...` |
| `PORT` | Port for the backend server | `5000` |

---

## 📡 API Endpoints

The backend provides a robust REST API.

| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `GET` | `/api/items` | Fetch all inventory items |
| `POST` | `/api/items` | Create a new inventory item |
| `POST` | `/api/transaction` | Handle Stock In / Stock Out operations |

---

## 📂 Project Structure

```
inventory-management-system/
├── client/                    # Next.js Frontend
│   ├── src/app/              # App Router Pages
│   ├── components/           # Reusable UI Components (Modals)
│   ├── types/                # TypeScript Interfaces
│   └── utils/                # API Axios Helper
├── server/                    # Express Backend
│   ├── models/               # Mongoose Schemas (Item, Transaction)
│   ├── routes/               # API Routes
│   └── index.js              # Server Entry Point
└── README.md                  # Project Documentation
```

---

## 👨‍💻 Author

**Rohit Goyal**

- **Role:** Full Stack Developer
- **University:** Indian Institute of Information Technology (IIIT), Nagpur
- **GitHub:** [@RohitGoyal13](https://github.com/RohitGoyal13)

---

## 📄 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/RohitGoyal13/inventory-management-system/issues).

---

## ⭐ Show your support

Give a ⭐️ if this project helped you!

---

**Made with ❤️ by Rohit Goyal**