import { useState, useEffect } from 'react';
import { attendanceApi, employeeApi } from '../../services/api';
import './AttendanceForm.css';

export default function AttendanceForm({ onAttendanceMarked }) {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        employee_id: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const loadEmployees = async () => {
            try {
                const data = await employeeApi.getAll();
                setEmployees(data);
            } catch (err) {
                setError('Failed to load employees. Please try again.');
            }
        };
        loadEmployees();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await attendanceApi.markAttendance({
                ...formData,
                employee_id: parseInt(formData.employee_id)
            });
            setSuccess('Attendance marked successfully! The form will reset shortly.');
            
            setTimeout(() => {
                setFormData({
                    employee_id: '',
                    date: new Date().toISOString().split('T')[0],
                    status: 'Present'
                });
                setSuccess('');
                if (onAttendanceMarked) {
                    onAttendanceMarked();
                }
            }, 2000);

        } catch (err) {
            setError(err.response?.data?.detail || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card attendance-form">
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-group">
                        <label className="label">Employee *</label>
                        <select
                            name="employee_id"
                            value={formData.employee_id}
                            onChange={handleChange}
                            className="input"
                            required
                        >
                            <option value="" disabled>Select an employee</option>
                            {employees.map((emp) => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.full_name} ({emp.employee_id})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="label">Date *</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="input"
                            max={new Date().toISOString().split('T')[0]}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="label">Status *</label>
                        <div className="status-buttons">
                            <button
                                type="button"
                                className={`status-btn ${formData.status === 'Present' ? 'active-present' : ''}`}
                                onClick={() => setFormData({ ...formData, status: 'Present' })}
                            >
                                ✓ Present
                            </button>
                            <button
                                type="button"
                                className={`status-btn ${formData.status === 'Absent' ? 'active-absent' : ''}`}
                                onClick={() => setFormData({ ...formData, status: 'Absent' })}
                            >
                                ✗ Absent
                            </button>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading || !formData.employee_id}
                    style={{ marginTop: '1.5rem', width: '100%' }}
                >
                    {loading ? 'Submitting...' : '✓ Submit Attendance'}
                </button>
            </form>
        </div>
    );
}
