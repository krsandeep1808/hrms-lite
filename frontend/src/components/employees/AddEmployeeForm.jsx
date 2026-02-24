import { useState, useEffect } from 'react';
import { employeeApi } from '../../services/api';
import './EmployeeForm.css';

export default function AddEmployeeForm({ onEmployeeAdded }) {
    const [formData, setFormData] = useState({
        employee_id: '',
        full_name: '',
        email: '',
        department: ''
    });
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const depts = await employeeApi.getDepartments();
                if (depts && depts.length > 0) {
                    setDepartments(depts);
                } else {
                    // Provide a default list if the API returns an empty list
                    setDepartments([
                        "Human Resources",
                        "Engineering",
                        "Marketing",
                        "Sales",
                        "Finance",
                        "IT"
                    ]);
                }
            } catch (err) {
                console.error("Failed to fetch departments:", err);
                // Optionally, set default departments on error as well
                setDepartments([
                    "Human Resources",
                    "Engineering",
                    "Marketing",
                    "Sales",
                    "Finance",
                    "IT"
                ]);
            }
        };
        fetchDepartments();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await employeeApi.create(formData);
            setSuccess('Employee added successfully! The form will reset shortly.');

            setTimeout(() => {
                setFormData({
                    employee_id: '',
                    full_name: '',
                    email: '',
                    department: ''
                });
                setSuccess('');
                if (onEmployeeAdded) {
                    onEmployeeAdded();
                }
            }, 2000);

        } catch (err) {
            setError(err.response?.data?.detail || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card employee-form">
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-group">
                        <label className="label">Employee ID *</label>
                        <input
                            type="text"
                            name="employee_id"
                            value={formData.employee_id}
                            onChange={handleChange}
                            className="input"
                            placeholder="e.g., EMP001"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="label">Full Name *</label>
                        <input
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            className="input"
                            placeholder="e.g., John Doe"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="label">Email Address *</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input"
                            placeholder="e.g., john.doe@example.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="label">Department *</label>
                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="input"
                            required
                        >
                            <option value="" disabled>Select a department</option>
                            {departments.map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                    style={{ marginTop: '1.5rem', width: '100%' }}
                >
                    {loading ? 'Submitting...' : '✓ Submit & Add Employee'}
                </button>
            </form>
        </div>
    );
}
