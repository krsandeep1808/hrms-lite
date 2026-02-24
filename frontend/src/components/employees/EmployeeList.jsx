import { useState } from 'react';
import { employeeApi } from '../../services/api';
import EmptyState from '../common/EmptyState';
import ConfirmModal from '../common/ConfirmModal';
import './EmployeeList.css';

export default function EmployeeList({ employees, onEmployeeDeleted }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [deletingId, setDeletingId] = useState(null);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);

    const openDeleteModal = (employee) => {
        setEmployeeToDelete(employee);
    };

    const closeDeleteModal = () => {
        setEmployeeToDelete(null);
    };

    const handleDelete = async () => {
        if (!employeeToDelete) return;

        setDeletingId(employeeToDelete.id);
        closeDeleteModal();

        try {
            await employeeApi.delete(employeeToDelete.id);
            if (onEmployeeDeleted) {
                onEmployeeDeleted();
            }
        } catch (err) {
            alert('Error deleting employee: ' + err.message);
        } finally {
            setDeletingId(null);
        }
    };

    const filteredEmployees = employees.filter(emp =>
        emp.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.employee_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="employee-list-container">
                <div style={{ marginBottom: '1.5rem' }}>
                    <input
                        type="text"
                        placeholder="🔍 Search employees..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input search-input"
                    />
                </div>

                {filteredEmployees.length === 0 ? (
                    <EmptyState
                        icon="👥"
                        title="No employees found"
                        message={searchTerm ? "Try adjusting your search" : "Add your first employee to get started"}
                    />
                ) : (
                    <div className="employee-grid">
                        {filteredEmployees.map((employee) => (
                            <div key={employee.id} className="card employee-card">
                                <div className="employee-header">
                                    <div className="employee-avatar">
                                        {employee.full_name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="employee-info">
                                        <h4>{employee.full_name}</h4>
                                        <p className="employee-id">{employee.employee_id}</p>
                                    </div>
                                </div>

                                <div className="employee-details">
                                    <div className="detail-item">
                                        <span className="detail-label">📧 Email</span>
                                        <span className="detail-value">{employee.email}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">🏢 Department</span>
                                        <span className="detail-value">{employee.department}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => openDeleteModal(employee)}
                                    disabled={deletingId === employee.id}
                                    className="btn btn-danger delete-btn"
                                >
                                    {deletingId === employee.id ? 'Deleting...' : '🗑️ Delete'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <ConfirmModal
                isOpen={!!employeeToDelete}
                title="Confirm Deletion"
                message={`Are you sure you want to delete ${employeeToDelete?.full_name}? This action cannot be undone.`}
                onConfirm={handleDelete}
                onCancel={closeDeleteModal}
                confirmText="Delete"
                isDestructive
            />
        </>
    );
}
