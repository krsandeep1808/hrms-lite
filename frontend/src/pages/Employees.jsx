import { useState, useEffect } from 'react';
import { employeeApi } from '../services/api';
import AddEmployeeForm from '../components/employees/AddEmployeeForm';
import EmployeeList from '../components/employees/EmployeeList';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

export default function Employees() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await employeeApi.getAll();
            setEmployees(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontWeight: 700 }}>Employee Management</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                        Add, view, and manage your organization's employees.
                    </p>
                </div>
                <button 
                    className="btn btn-primary" 
                    onClick={() => setIsFormVisible(!isFormVisible)}
                >
                    {isFormVisible ? '✕ Close Form' : '＋ Add Employee'}
                </button>
            </div>

            {isFormVisible && (
                <AddEmployeeForm 
                    onEmployeeAdded={() => {
                        loadEmployees();
                        setIsFormVisible(false);
                    }} 
                />
            )}

            <div className="card">
                <h2 style={{ marginBottom: '1.5rem', fontWeight: 600 }}>
                    All Employees ({employees.length})
                </h2>
                {loading ? (
                    <Loading />
                ) : error ? (
                    <ErrorMessage message={error} onRetry={loadEmployees} />
                ) : (
                    <EmployeeList employees={employees} onEmployeeDeleted={loadEmployees} />
                )}
            </div>
        </div>
    );
}
