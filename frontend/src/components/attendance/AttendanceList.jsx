import { useState, useMemo } from 'react';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import EmptyState from '../common/EmptyState';
import './AttendanceList.css';

export default function AttendanceList({ attendances }) {
    const [filterEmployee, setFilterEmployee] = useState('');
    const [filterDate, setFilterDate] = useState(null);

    const filteredAttendances = useMemo(() => {
        return attendances.filter(att => {
            const matchesEmployee = !filterEmployee || att.employee_name.toLowerCase().includes(filterEmployee.toLowerCase());
            
            if (!filterDate) return matchesEmployee;

            const attDate = new Date(att.date);
            if (filterDate.type === 'day') {
                return matchesEmployee && format(attDate, 'yyyy-MM-dd') === filterDate.value;
            }
            if (filterDate.type === 'week') {
                return matchesEmployee && isWithinInterval(attDate, { start: filterDate.start, end: filterDate.end });
            }
            if (filterDate.type === 'month') {
                return matchesEmployee && isWithinInterval(attDate, { start: filterDate.start, end: filterDate.end });
            }
            return matchesEmployee;
        });
    }, [attendances, filterEmployee, filterDate]);

    const setDateFilter = (type) => {
        const today = new Date();
        if (type === 'today') {
            setFilterDate({ type: 'day', value: format(today, 'yyyy-MM-dd') });
        } else if (type === 'this_week') {
            setFilterDate({ type: 'week', start: startOfWeek(today, { weekStartsOn: 1 }), end: endOfWeek(today, { weekStartsOn: 1 }) });
        } else if (type === 'this_month') {
            setFilterDate({ type: 'month', start: startOfMonth(today), end: endOfMonth(today) });
        } else {
            setFilterDate(null);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'MMM d, yyyy');
    };
    
    return (
        <div className="attendance-list-container">
            <div className="filters card">
                <input
                    type="text"
                    placeholder="🔍 Search by employee name..."
                    value={filterEmployee}
                    onChange={(e) => setFilterEmployee(e.target.value)}
                    className="input filter-input"
                />
                <div className="date-filters">
                    <button onClick={() => setDateFilter('today')} className={`btn btn-secondary ${filterDate?.type === 'day' ? 'active' : ''}`}>Today</button>
                    <button onClick={() => setDateFilter('this_week')} className={`btn btn-secondary ${filterDate?.type === 'week' ? 'active' : ''}`}>This Week</button>
                    <button onClick={() => setDateFilter('this_month')} className={`btn btn-secondary ${filterDate?.type === 'month' ? 'active' : ''}`}>This Month</button>
                    {(filterDate || filterEmployee) && (
                        <button
                            onClick={() => { setFilterDate(null); setFilterEmployee(''); }}
                            className="btn btn-secondary"
                        >
                            Clear Filters
                        </button>
                    )}
                </div>
            </div>

            {filteredAttendances.length === 0 ? (
                <EmptyState
                    icon="📅"
                    title="No attendance records found"
                    message={filterDate || filterEmployee ? "Try adjusting your filters" : "Mark attendance to see records"}
                />
            ) : (
                <div className="attendance-table-container card">
                    <table className="attendance-table">
                        <thead>
                            <tr>
                                <th>Employee</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Marked At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAttendances.map((attendance) => (
                                <tr key={attendance.id}>
                                    <td className="employee-cell">
                                        <div className="employee-mini-avatar">
                                            {attendance.employee_name.charAt(0).toUpperCase()}
                                        </div>
                                        <span>{attendance.employee_name}</span>
                                    </td>
                                    <td>{formatDate(attendance.date)}</td>
                                    <td>
                                        <span className={`badge ${attendance.status === 'Present' ? 'badge-success' : 'badge-error'}`}>
                                            {attendance.status === 'Present' ? '✓' : '✗'} {attendance.status}
                                        </span>
                                    </td>
                                    <td className="time-cell">
                                        {format(new Date(attendance.created_at), 'Pp')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {filteredAttendances.length > 0 && (
                <div className="attendance-summary">
                    <p>
                        Showing <strong>{filteredAttendances.length}</strong> attendance record{filteredAttendances.length !== 1 ? 's' : ''}
                    </p>
                </div>
            )}
        </div>
    );
}
