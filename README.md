# 💰 Finance Tracker

A full-stack personal finance tracker to manage income, expenses, and view spending analytics.

## 🚀 Live Demo
- Frontend: https://finance-tracker-neon-seven.vercel.app/
- Backend: https://finance-tracker-backend-phpf.onrender.com

## ✨ Features
- Add, edit, and delete transactions
- Filter by category and type
- Summary cards — income, expense, net balance
- Charts — expense breakdown and monthly overview
- Fully responsive UI

## 🛠 Tech Stack
| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, Recharts |
| Backend | Flask, Python 3.11 |
| Database | PostgreSQL (Render) |
| Deployment | Vercel (frontend), Render (backend) |

## ⚙️ Local Setup

### Backend
```bash
cd backend
pip install -r requirements.txt
# Add .env with DATABASE_URL
python app.py
```

### Frontend
```bash
cd frontend
npm install
# Add .env with VITE_API_URL
npm run dev
```

## 📁 Project Structure
```
finance-tracker/
├── backend/
│   ├── app.py
│   ├── db.py
│   ├── config.py
│   ├── requirements.txt
│   └── routes/
│       └── transactions.py
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── services/
└── README.md
```