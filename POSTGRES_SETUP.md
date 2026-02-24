# PostgreSQL Setup Guide for Windows

## Step 1: Install PostgreSQL (If Not Already Installed)

### Download PostgreSQL
1. Visit: https://www.postgresql.org/download/windows/
2. Click "Download the installer"
3. Download **PostgreSQL 16.x** (or latest version)
4. Run the installer

### Installation Steps
1. **Select Components**: Keep all default selections (PostgreSQL Server, pgAdmin 4, Command Line Tools)
2. **Data Directory**: Keep default
3. **Password**: Set a password for the `postgres` superuser (remember this!)
4. **Port**: Keep default **5432**
5. **Locale**: Keep default
6. Click "Next" and finish installation

---

## Step 2: Create Database for HRMS

You have already configured your `.env` file with:
```
DATABASE_URL=postgresql://prakhar:12345678@localhost:5432/hrms_db
```

Now you need to create the database and user. Choose **ONE** method below:

### Option A: Using pgAdmin (GUI - Easier)

1. **Open pgAdmin 4** (installed with PostgreSQL)
2. **Connect to Server**:
   - Right-click "PostgreSQL 16" → Connect
   - Enter your postgres password
   
3. **Create Database User** (prakhar):
   - Right-click "Login/Group Roles" → Create → Login/Group Role
   - **General Tab**: Name = `prakhar`
   - **Definition Tab**: Password = `12345678`
   - **Privileges Tab**: Check "Can login?" and "Superuser"
   - Click "Save"

4. **Create Database**:
   - Right-click "Databases" → Create → Database
   - **Database**: `hrms_db`
   - **Owner**: Select `prakhar`
   - Click "Save"

✅ Done! Skip to Step 3.

---

### Option B: Using Command Line (psql)

1. **Open Command Prompt** (as Administrator)

2. **Connect to PostgreSQL**:
```bash
psql -U postgres
```
Enter your postgres password when prompted.

3. **Run these SQL commands**:
```sql
CREATE USER prakhar WITH PASSWORD '12345678';

ALTER USER prakhar WITH SUPERUSER;

CREATE DATABASE hrms_db OWNER prakhar;

\q
```

✅ Done!

---

## Step 3: Verify Database Connection

1. **Navigate to backend directory**:
```bash
cd C:\Users\katiy\OneDrive\Desktop\Project\HRMS\backend
```

2. **Activate virtual environment** (if not already):
```bash
venv\Scripts\activate
```

3. **Test connection** by starting the backend:
```bash
uvicorn app.main:app --reload
```

4. **Check for success**:
   - You should see: `INFO:     Uvicorn running on http://127.0.0.1:8000`
   - No database connection errors
   - Visit: http://localhost:8000/docs (should load API docs)

---

## Troubleshooting

### Error: "FATAL: password authentication failed for user 'prakhar'"
- **Solution**: Recreate the user with correct password OR update `.env` with correct credentials

### Error: "FATAL: database 'hrms_db' does not exist"
- **Solution**: Create the database using pgAdmin or psql (see Step 2)

### Error: "connection refused"
- **Solution**: Make sure PostgreSQL service is running
  - Press `Win + R`, type `services.msc`
  - Find "postgresql-x64-16" service
  - Right-click → Start (if not running)

### Error: "psql: command not found"
- **Solution**: Add PostgreSQL to PATH:
  1. Copy path: `C:\Program Files\PostgreSQL\16\bin`
  2. Add to System Environment Variables → Path
  3. Restart Command Prompt

---

## Next Steps

Once database is set up and verified:
1. Start backend: `uvicorn app.main:app --reload`
2. Start frontend: `npm run dev` (in frontend directory)
3. Test application at `http://localhost:5173`

---

**✨ Your PostgreSQL database is ready for HRMS Lite! ✨**
