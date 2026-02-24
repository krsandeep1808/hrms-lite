import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

    return (
        <nav className="navigation">
            <div className="nav-header">
                <h1 className="nav-title">HRMS</h1>
            </div>

            <div className="nav-links">
                <Link
                    to="/"
                    title="Dashboard"
                    className={`nav-link ${isActive('/') ? 'active' : ''}`}
                >
                    <span className="nav-icon">📊</span>
                    <span>Dashboard</span>
                </Link>

                <Link
                    to="/employees"
                    title="Employees"
                    className={`nav-link ${isActive('/employees') ? 'active' : ''}`}
                >
                    <span className="nav-icon">👥</span>
                    <span>Employees</span>
                </Link>

                <Link
                    to="/attendance"
                    title="Attendance"
                    className={`nav-link ${isActive('/attendance') ? 'active' : ''}`}
                >
                    <span className="nav-icon">📅</span>
                    <span>Attendance</span>
                </Link>
            </div>

            <div className="nav-footer">
                <p>&copy; {new Date().getFullYear()} HRMS Lite</p>
            </div>
        </nav>
    );
}
