# HRMS Backend - MVC Architecture

## Overview

The HRMS backend follows a clean MVC (Model-View-Controller) architecture with additional service and repository layers for better separation of concerns.

## Architecture Layers

### 1. Models (Data Layer)
**Location**: `app/models.py`

Defines database entities using SQLAlchemy ORM:
- `Employee` - Employee information
- `Attendance` - Attendance records

**Responsibilities**:
- Database schema definition
- Entity relationships
- Field constraints

---

### 2. Repositories (Data Access Layer)
**Location**: `app/repositories/`

Handles all database operations and queries.

#### EmployeeRepository
**File**: `employee_repository.py`

**Methods**:
- `create(employee_data)` - Create new employee
- `get_all()` - Get all employees
- `get_by_id(employee_id)` - Find by internal ID
- `get_by_employee_id(employee_id)` - Find by employee ID
- `get_by_email(email)` - Find by email
- `delete(employee)` - Delete employee

#### AttendanceRepository
**File**: `attendance_repository.py`

**Methods**:
- `create(attendance_data)` - Create attendance record
- `get_by_employee_id(employee_id)` - Get employee's attendance history
- `get_by_employee_and_date(employee_id, date)` - Check specific date
- `get_all_with_employees(date_filter)` - Get all with employee details

**Responsibilities**:
- CRUD operations
- Database queries
- No business logic

---

### 3. Services (Business Logic Layer)
**Location**: `app/services/`

Contains all business logic and validation rules.

#### EmployeeService
**File**: `employee_service.py`

**Methods**:
- `create_employee(employee)` - Validates and creates employee
- `get_all_employees()` - Returns all employees
- `delete_employee(employee_id)` - Deletes employee

**Business Rules**:
- Validates unique employee_id
- Validates unique email
- Returns proper error messages

#### AttendanceService
**File**: `attendance_service.py`

**Methods**:
- `mark_attendance(attendance)` - Marks attendance with validation
- `get_employee_attendance(employee_id)` - Get employee attendance
- `get_all_attendance(date_filter)` - Get all attendance records

**Business Rules**:
- Validates employee exists
- Prevents duplicate attendance for same date
- Enriches responses with employee names

**Responsibilities**:
- Business validation
- Data transformation
- Error handling
- Orchestrating repository calls

---

### 4. Controllers (HTTP Layer)
**Location**: `app/controllers/`

Thin layer that handles HTTP requests and responses.

#### EmployeeController
**File**: `employee_controller.py`

**Endpoints**:
- `POST /api/employees` - Create employee
- `GET /api/employees` - List all employees
- `DELETE /api/employees/{id}` - Delete employee

#### AttendanceController
**File**: `attendance_controller.py`

**Endpoints**:
- `POST /api/attendance` - Mark attendance
- `GET /api/attendance/{employee_id}` - Get employee attendance
- `GET /api/attendance?date=YYYY-MM-DD` - Get attendance by date

**Responsibilities**:
- Route definitions
- Request/response handling
- Dependency injection
- HTTP status codes

---

### 5. Schemas (DTOs)
**Location**: `app/schemas.py`

Pydantic models for request/response validation:
- `EmployeeCreate` - Employee creation payload
- `EmployeeResponse` - Employee response format
- `AttendanceCreate` - Attendance creation payload
- `AttendanceResponse` - Attendance response format

---

## Request Flow

```
HTTP Request
    ↓
Controller (HTTP Layer)
    ↓
Service (Business Logic)
    ↓
Repository (Data Access)
    ↓
Database
```

### Example: Creating an Employee

1. **Controller** receives POST request with employee data
2. **Controller** passes data to **EmployeeService**
3. **Service** validates:
   - Employee ID doesn't exist (via repository)
   - Email doesn't exist (via repository)
4. **Service** calls **Repository** to create employee
5. **Repository** performs database insert
6. Response flows back up through layers

---

## Benefits of This Architecture

### ✅ Separation of Concerns
- Each layer has a single responsibility
- Easy to understand and maintain

### ✅ Testability
- Services can be unit tested with mocked repositories
- Repositories can be tested independently
- Controllers remain thin and simple

### ✅ Reusability
- Services can be reused across multiple controllers
- Repositories can be shared between services

### ✅ Maintainability
- Business logic centralized in services
- Database logic isolated in repositories
- Changes in one layer don't affect others

### ✅ Scalability
- Easy to add new features following same pattern
- Clear structure for new developers
- Consistent code organization

---

## File Structure

```
backend/
└── app/
    ├── models.py              # Database models (M)
    ├── schemas.py             # Request/Response DTOs
    ├── database.py            # Database configuration
    ├── main.py                # FastAPI app setup
    │
    ├── controllers/           # HTTP layer (C)
    │   ├── __init__.py
    │   ├── employee_controller.py
    │   └── attendance_controller.py
    │
    ├── services/              # Business logic
    │   ├── __init__.py
    │   ├── employee_service.py
    │   └── attendance_service.py
    │
    └── repositories/          # Data access
        ├── __init__.py
        ├── employee_repository.py
        └── attendance_repository.py
```

---

## Design Patterns Used

### 1. Repository Pattern
- Abstracts data access logic
- Provides collection-like interface for domain objects

### 2. Service Layer Pattern
- Encapsulates business logic
- Provides clean API for controllers

### 3. Dependency Injection
- Database sessions injected via FastAPI's Depends
- Loose coupling between layers

### 4. DTO Pattern
- Pydantic schemas for data transfer
- Clear contract between layers

---

## Best Practices Followed

1. **Single Responsibility Principle**
   - Each class has one reason to change

2. **Dependency Inversion**
   - Controllers depend on services
   - Services depend on repositories

3. **Don't Repeat Yourself (DRY)**
   - Common logic in services
   - Shared queries in repositories

4. **Clear Naming Conventions**
   - Descriptive method names
   - Consistent file naming

---

## Adding New Features

### Step 1: Create Model
Add new entity in `models.py` if needed

### Step 2: Create Repository
Add repository in `repositories/` with data access methods

### Step 3: Create Service
Add service in `services/` with business logic

### Step 4: Create Controller
Add controller in `controllers/` with HTTP endpoints

### Step 5: Register Routes
Import and include router in `main.py`

---

**This architecture ensures clean, maintainable, and scalable code! 🚀**
