import { useState, useEffect } from 'react';
import { attendanceApi } from '../services/api';
import AttendanceForm from '../components/attendance/AttendanceForm';
import AttendanceList from '../components/attendance/AttendanceList';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

export default function Attendance() {
    const [attendances, setAttendances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        loadAttendances();
    }, []);

    const loadAttendances = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await attendanceApi.getAll();
            setAttendances(data);
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
                    <h1 style={{ fontWeight: 700 }}>Attendance Management</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                        Track and manage daily employee attendance records.
                    </p>
                </div>
                <button 
                    className="btn btn-primary" 
                    onClick={() => setIsFormVisible(!isFormVisible)}
                >
                    {isFormVisible ? '✕ Close Form' : '＋ Mark Attendance'}
                </button>
            </div>
            
            {isFormVisible && (
                <AttendanceForm 
                    onAttendanceMarked={() => {
                        loadAttendances();
                        setIsFormVisible(false);
                    }} 
                />
            )}

            <div>
                {loading ? (
                    <div className="card"><Loading /></div>
                ) : error ? (
                    <ErrorMessage message={error} onRetry={loadAttendances} />
                ) : (
                    <AttendanceList attendances={attendances} />
                )}
            </div>
        </div>
    );
}
