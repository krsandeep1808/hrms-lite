from sqlalchemy.orm import Session
from typing import List, Optional, Tuple
from datetime import date
from ..models import Attendance, Employee

class AttendanceRepository:
    
    def __init__(self, db: Session):
        self.db = db
    
    def create(self, attendance_data: dict) -> Attendance:
        attendance = Attendance(**attendance_data)
        self.db.add(attendance)
        self.db.commit()
        self.db.refresh(attendance)
        return attendance
    
    def get_by_employee_id(self, employee_id: int) -> List[Attendance]:
        return self.db.query(Attendance).filter(
            Attendance.employee_id == employee_id
        ).order_by(Attendance.date.desc()).all()
    
    def get_by_employee_and_date(self, employee_id: int, attendance_date: date) -> Optional[Attendance]:
        return self.db.query(Attendance).filter(
            Attendance.employee_id == employee_id,
            Attendance.date == attendance_date
        ).first()
    
    def get_all_with_employees(self, date_filter: Optional[date] = None) -> List[Tuple[Attendance, Employee]]:
        query = self.db.query(Attendance, Employee).join(
            Employee, Attendance.employee_id == Employee.id
        )
        
        if date_filter:
            query = query.filter(Attendance.date == date_filter)
        
        return query.order_by(Attendance.date.desc()).all()
