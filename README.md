# HRMS Lite - Human Resource Management System

A modern, full-stack web application for managing employee records and tracking daily attendance. Built with React, FastAPI, and PostgreSQL.

## Features

### Employee Management
-  Add new employees with validation
- View all employees in a card-based layout
- Search employees by name, ID, email, or department
- Delete employee records
- Duplicate employee ID and email prevention

### Attendance Management
- Mark daily attendance (Present/Absent)
- View attendance records in table format
- Filter attendance by employee name or date
- Prevent duplicate attendance for the same date
- Automatic date validation

### Dashboard
- Real-time statistics overview
- Total employees count
- Today's attendance summary
- Present/Absent counts

##  Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling with CSS variables

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **PostgreSQL** - Relational database
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

## Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.9+
- **PostgreSQL** 12+

## Local Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd hrms-lite
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
copy .env.example .env

# Edit .env and update DATABASE_URL with your PostgreSQL credentials
# Example: DATABASE_URL=postgresql://username:password@localhost:5432/hrms_db

# Create database (in PostgreSQL)
# psql -U postgres
# CREATE DATABASE hrms_db;

# Run the server
uvicorn app.main:app --reload
```

The backend API will be available at `http://localhost:8000`
- API Documentation: `http://localhost:8000/docs`
- Alternative Docs: `http://localhost:8000/redoc`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env if needed (default: VITE_API_URL=http://localhost:8000)

# Run development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Project Structure

```
HRMS/
├── backend/
│   ├── app/
│   │   ├── controllers/          # Controllers (HTTP layer)
│   │   │   ├── employee_controller.py
│   │   │   └── attendance_controller.py
│   │   ├── services/             # Business logic layer
│   │   │   ├── employee_service.py
│   │   │   └── attendance_service.py
│   │   ├── repositories/         # Data access layer
│   │   │   ├── employee_repository.py
│   │   │   └── attendance_repository.py
│   │   ├── main.py               # FastAPI app entry
│   │   ├── database.py           # Database configuration
│   │   ├── models.py             # SQLAlchemy models
│   │   └── schemas.py            # Pydantic schemas
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── employees/        # Employee components
│   │   │   ├── attendance/       # Attendance components
│   │   │   ├── Layout.jsx
│   │   │   ├── Navigation.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   └── EmptyState.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Employees.jsx
│   │   │   └── Attendance.jsx
│   │   ├── services/
│   │   │   └── api.js            # API service layer
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── .env.example
│
├── ARCHITECTURE.md               # Backend architecture docs
├── DEPLOYMENT_GUIDE.md           # Deployment instructions
├── POSTGRES_SETUP.md             # PostgreSQL setup
└── README.md
```

### Backend Architecture

Follows **MVC pattern** with service and repository layers:
- **Controllers**: Handle HTTP requests/responses
- **Services**: Business logic and validation
- **Repositories**: Database operations
- **Models**: Database entities
- **Schemas**: Request/Response DTOs

📖 See [ARCHITECTURE.md](file:///C:/Users/katiy/OneDrive/Desktop/Project/HRMS/ARCHITECTURE.md) for detailed architecture documentation.

## API Endpoints

### Employees
- `POST /api/employees` - Create new employee
- `GET /api/employees` - Get all employees
- `DELETE /api/employees/{id}` - Delete employee

### Attendance
- `POST /api/attendance` - Mark attendance
- `GET /api/attendance/{employee_id}` - Get employee attendance
- `GET /api/attendance?date=YYYY-MM-DD` - Get attendance by date

## UI Features

- Dark theme with gradient accents
- Smooth animations and transitions
- Fully responsive mobile design
- Intuitive navigation
- Loading states and error handling
- Search and filter functionality

## Deployment

### Backend Deployment (Render/Railway)

1. Create a PostgreSQL database on your hosting platform
2. Set environment variables:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `CORS_ORIGINS` - Your frontend URL
3. Deploy the `backend` directory
4. Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### Frontend Deployment (Vercel/Netlify)

1. Set environment variable:
   - `VITE_API_URL` - Your deployed backend URL
2. Deploy the `frontend` directory
3. Build command: `npm run build`
4. Output directory: `dist`

## Validation & Error Handling

### Backend Validations
- Email format validation
- Duplicate employee ID check
- Duplicate email check
- Employee existence check for attendance
- Duplicate attendance prevention
- Date range validation

### Frontend Validations
- Required field validation
- Email format validation
- Date picker with max date (today)
- Form state management
- Error message display

## Assumptions & Limitations

### Assumptions
- Single admin user (no authentication required)
- Attendance can only be marked for dates up to today
- One attendance record per employee per day
- Employee deletion cascades to attendance records

### Limitations
- No user authentication/authorization
- No attendance editing (only create and view)
- No employee editing (only add and delete)
- No payroll or leave management
- No file uploads or document management
- No email notifications

## Testing the Application

### Test Employee Creation
1. Navigate to Employees page
2. Fill in the form with:
   - Employee ID: EMP0123
   - Name: Sandeep Kumar
   - Email: Sandeep@example.com
   - Department: Engineering
3. Click "Add Employee"
4. Verify employee appears in the list

### Test Attendance Marking
1. Navigate to Attendance page
2. Select an employee from dropdown
3. Select today's date
4. Choose Present or Absent
5. Click "Mark Attendance"
6. Verify attendance appears in records

### Test Validations
1. Try adding duplicate employee ID → Should show error
2. Try marking attendance twice for same date → Should show error
3. Try invalid email format → Should show validation error

## Development

### Commands Summary

**Backend:**
```bash
uvicorn app.main:app --reload          # Development server
uvicorn app.main:app --host 0.0.0.0   # Production server
```

**Frontend:**
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

---
