# HRMS Lite - Quick Start Commands

## 🎯 What You Need to Do

Follow these steps in order to set up PostgreSQL, test locally, and deploy your application.

---

## Step 1: Set Up PostgreSQL Database

### Option A: Using pgAdmin (Easier)
1. Open **pgAdmin 4**
2. Create user `postgres` with password `12345678`
3. Create database `hrms_db` with owner `postgres`

### Option B: Using Command Line
```bash
psql -U postgres
```
Then run:
```sql
CREATE USER postgres WITH PASSWORD '12345678';
ALTER USER postgres WITH SUPERUSER;
CREATE DATABASE hrms_db OWNER postgres;
\q
```

📖 **Detailed guide**: [POSTGRES_SETUP.md](file:///C:/Users/katiy/OneDrive/Desktop/Project/HRMS/POSTGRES_SETUP.md)

---

## Step 2: Start Backend Locally

```bash
cd C:\Users\katiy\OneDrive\Desktop\Project\HRMS\backend

venv\Scripts\activate

uvicorn app.main:app --reload
```

✅ Backend runs on: http://localhost:8000  
✅ API Docs: http://localhost:8000/docs

---

## Step 3: Start Frontend Locally

Open **new terminal**:

```bash
cd C:\Users\katiy\OneDrive\Desktop\Project\HRMS\frontend

npm run dev
```

✅ Frontend runs on: http://localhost:5173

---

## Step 4: Test Application Locally

1. Visit http://localhost:5173
2. Add employees
3. Mark attendance
4. View dashboard

---

## Step 5: Deploy to Cloud

📖 **Follow deployment guide**: [DEPLOYMENT_GUIDE.md](file:///C:/Users/katiy/OneDrive/Desktop/Project/HRMS/DEPLOYMENT_GUIDE.md)

**Summary:**
1. Create Render account → Deploy PostgreSQL database
2. Push code to GitHub
3. Deploy backend on Render
4. Deploy frontend on Vercel
5. Test live application

---

## Step 6: Submit Assignment

📖 **Follow submission guide**: [SUBMISSION_GUIDE.md](file:///C:/Users/katiy/OneDrive/Desktop/Project/HRMS/SUBMISSION_GUIDE.md)

**You'll need:**
- ✅ Live frontend URL
- ✅ Live backend URL
- ✅ GitHub repository URL
- ✅ All features tested

---

## 📚 All Documentation

| Guide | Purpose |
|-------|---------|
| [README.md](file:///C:/Users/katiy/OneDrive/Desktop/Project/HRMS/README.md) | Project overview |
| [POSTGRES_SETUP.md](file:///C:/Users/katiy/OneDrive/Desktop/Project/HRMS/POSTGRES_SETUP.md) | PostgreSQL installation |
| [SETUP_COMMANDS.md](file:///C:/Users/katiy/OneDrive/Desktop/Project/HRMS/SETUP_COMMANDS.md) | Local setup commands |
| [DEPLOYMENT_GUIDE.md](file:///C:/Users/katiy/OneDrive/Desktop/Project/HRMS/DEPLOYMENT_GUIDE.md) | Cloud deployment |
| [SUBMISSION_GUIDE.md](file:///C:/Users/katiy/OneDrive/Desktop/Project/HRMS/SUBMISSION_GUIDE.md) | Assignment submission |
| [QUICK_START.md](file:///C:/Users/katiy/OneDrive/Desktop/Project/HRMS/QUICK_START.md) | This file |

---

**🚀 Ready to build and deploy your HRMS Lite! 🚀**
