import { useState, useEffect } from 'react';
import { employeeApi, attendanceApi } from '../services/api';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import './Dashboard.css';

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalEmployees: 0,
        todayAttendance: 0,
        presentToday: 0,
        absentToday: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        setLoading(true);
        setError('');
        try {
            const employees = await employeeApi.getAll();
            const today = new Date().toISOString().split('T')[0];
            const todayAttendance = await attendanceApi.getAll(today);

            const presentCount = todayAttendance.filter(a => a.status === 'Present').length;
            const absentCount = todayAttendance.filter(a => a.status === 'Absent').length;

            setStats({
                totalEmployees: employees.length,
                todayAttendance: todayAttendance.length,
                presentToday: presentCount,
                absentToday: absentCount
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} onRetry={loadDashboardData} />;

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1>📊 Dashboard</h1>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                    Overview of your HRMS system
                </p>
            </div>

            <div className="stats-grid">
                <div className="stat-card card">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                        👥
                    </div>
                    <div className="stat-content">
                        <h3 className="stat-value">{stats.totalEmployees}</h3>
                        <p className="stat-label">Total Employees</p>
                    </div>
                </div>

                <div className="stat-card card">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                        ✓
                    </div>
                    <div className="stat-content">
                        <h3 className="stat-value">{stats.presentToday}</h3>
                        <p className="stat-label">Present Today</p>
                    </div>
                </div>

                <div className="stat-card card">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }}>
                        ✗
                    </div>
                    <div className="stat-content">
                        <h3 className="stat-value">{stats.absentToday}</h3>
                        <p className="stat-label">Absent Today</p>
                    </div>
                </div>

                <div className="stat-card card">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
                        📅
                    </div>
                    <div className="stat-content">
                        <h3 className="stat-value">{stats.todayAttendance}</h3>
                        <p className="stat-label">Today's Records</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-info card" style={{ marginTop: '2rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>Welcome to Your HRMS Lite Dashboard</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    This is your central hub for managing all HR-related activities. From here, you can seamlessly navigate to different sections of the application.
                </p>
                <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.5rem' }}>
                    <li style={{ marginBottom: '0.5rem' }}><strong>Employee Management:</strong> Add, view, and manage all employee records.</li>
                    <li style={{ marginBottom: '0.5rem' }}><strong>Attendance Tracking:</strong> Mark and monitor daily attendance for all employees.</li>
                    <li><strong>Dashboard Overview:</strong> Get a quick snapshot of key HR metrics.</li>
                </ul>
                <p style={{ color: 'var(--text-secondary)', marginTop: '1.5rem' }}>
                    Use the navigation menu to get started.
                </p>
            </div>
        </div>
    );
}
